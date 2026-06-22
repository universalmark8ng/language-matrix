// Real speech recognition via the Web Speech API (SpeechRecognition).
//
// Replaces the old simulated mic. This actually listens to the child in Hindi
// (hi-IN) and scores what they said against the expected phrase. When the
// browser can't do recognition (Safari/Firefox, no mic, permission denied,
// offline), callers fall back to an HONEST self-check — never a fake success.

const SR =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition)

export const recognitionSupported = () => !!SR

// ---- text matching ---------------------------------------------------------

function norm(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[।.?!,…]/g, '') // danda + punctuation
    .replace(/़/g, '') // strip nukta so क़≈क, ज़≈ज (kids/ASR vary)
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  if (!m) return n
  if (!n) return m
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 0; j <= n; j++) d[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
    }
  }
  return d[m][n]
}

const wordSim = (a, b) => (a === b ? 1 : 1 - levenshtein(a, b) / Math.max(a.length, b.length, 1))

// Fraction of expected words that show up in the transcript (lenient, so a
// child's imperfect pronunciation still counts). 0..1.
export function scoreMatch(expected, transcript) {
  const exp = norm(expected).split(' ').filter(Boolean)
  const got = norm(transcript).split(' ').filter(Boolean)
  if (!exp.length || !got.length) return 0
  let hit = 0
  for (const t of exp) {
    const best = Math.max(0, ...got.map((g) => wordSim(t, g)))
    if (best >= 0.6) hit += 1
  }
  return hit / exp.length
}

// Best score over the final transcript + all alternatives the engine returned.
export function bestScore(expected, result) {
  const candidates = [result.text, ...(result.alternatives || [])]
  return Math.max(0, ...candidates.map((c) => scoreMatch(expected, c)))
}

// A child's attempt passes at >= 55% word match (deliberately forgiving).
export const PASS_THRESHOLD = 0.55

// ---- live recognition ------------------------------------------------------

/**
 * Start a hold-to-talk session.
 *   onPartial(text)  — live (interim) transcript, for showing as they speak
 *   onDone({text, alternatives}) — fired when recognition ends
 *   onError(code)    — 'not-allowed' | 'audio-capture' | 'network' | 'no-speech' | …
 * Returns { stop, abort } or null if unsupported.
 */
export function startListening({ lang = 'hi-IN', onPartial, onDone, onError }) {
  if (!SR) {
    onError?.('unsupported')
    return null
  }
  const r = new SR()
  r.lang = lang
  r.interimResults = true
  r.maxAlternatives = 4
  r.continuous = false

  let finalText = ''
  const alts = []
  let errored = false

  r.onresult = (e) => {
    let interim = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const res = e.results[i]
      if (res.isFinal) {
        finalText += res[0].transcript + ' '
        for (let k = 0; k < res.length; k++) alts.push(res[k].transcript)
      } else {
        interim += res[0].transcript
      }
    }
    onPartial?.((finalText + interim).trim())
  }
  r.onerror = (e) => {
    errored = true
    onError?.(e.error || 'error')
  }
  r.onend = () => {
    if (!errored) onDone?.({ text: finalText.trim(), alternatives: alts })
  }

  try {
    r.start()
  } catch {
    onError?.('start-failed')
    return null
  }
  return {
    stop: () => {
      try {
        r.stop()
      } catch {
        /* already stopped */
      }
    },
    abort: () => {
      try {
        r.abort()
      } catch {
        /* noop */
      }
    },
  }
}
