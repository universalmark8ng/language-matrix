import { useEffect, useRef, useState } from 'react'
import { Mic, Check, X, RotateCcw, Ear } from 'lucide-react'
import { speakPhrase } from '../lib/speech.js'
import {
  recognitionSupported,
  startListening,
  bestScore,
  PASS_THRESHOLD,
} from '../lib/recognition.js'

/**
 * Speak-and-check modal — REAL Hindi speech recognition.
 *
 * The child holds the mic and says the phrase; the browser transcribes it in
 * hi-IN and we score it against the expected words. A real match → success.
 * A miss → "try again", showing what was actually heard (transparent, not fake).
 *
 * When recognition isn't available (Safari/Firefox, no mic, denied, offline)
 * we fall back to an HONEST self-check: "say it, then tap ✓ if you said it" —
 * judged by the child/teacher, never an automatic win. The teacher can also
 * accept a near-miss, since hi-IN engines aren't tuned for children.
 *
 * Props: open, phrase (block[]), prompt, successLabel, onSuccess, onClose
 */
export default function MicModal({
  open,
  phrase = [],
  prompt = 'Read it out loud!',
  successLabel = 'Yay! Continue →',
  onSuccess,
  onClose,
}) {
  // idle | listening | checking | success | retry | selfcheck
  const [phase, setPhase] = useState('idle')
  const [heard, setHeard] = useState('')
  const [partial, setPartial] = useState('')
  const [note, setNote] = useState('')
  const ctrlRef = useRef(null)

  const blocks = phrase.filter(Boolean)
  const expected = blocks.map((b) => b.target_script).join(' ')
  const transliteration = blocks.map((b) => b.target_transliteration).join(' ')

  // Reset on open. If recognition is unsupported, go straight to self-check.
  useEffect(() => {
    if (open) {
      setHeard('')
      setPartial('')
      setNote('')
      setPhase(recognitionSupported() ? 'idle' : 'selfcheck')
    }
    return () => ctrlRef.current?.abort()
  }, [open])

  if (!open) return null

  function beginListening() {
    if (phase !== 'idle' && phase !== 'retry') return
    setPartial('')
    setHeard('')
    setPhase('listening')
    ctrlRef.current = startListening({
      lang: 'hi-IN',
      onPartial: setPartial,
      onDone: ({ text, alternatives }) => {
        setHeard(text)
        const score = bestScore(expected, { text, alternatives })
        if (text && score >= PASS_THRESHOLD) {
          setPhase('success')
        } else {
          setNote(text ? '' : "I didn't catch that — speak a bit louder!")
          setPhase('retry')
        }
      },
      onError: (code) => {
        // Honest fallbacks — no fake success.
        if (code === 'no-speech') {
          setNote("I didn't hear anything — try again!")
          setPhase('retry')
        } else if (code === 'not-allowed' || code === 'service-not-allowed') {
          setNote('Microphone is blocked. Allow mic access, or self-check below.')
          setPhase('selfcheck')
        } else {
          // unsupported / network / audio-capture / start-failed
          setPhase('selfcheck')
        }
      },
    })
  }

  function stopListening() {
    if (phase !== 'listening') return
    setPhase('checking')
    ctrlRef.current?.stop()
  }

  const holdHandlers = {
    onMouseDown: beginListening,
    onMouseUp: stopListening,
    onMouseLeave: () => phase === 'listening' && stopListening(),
    onTouchStart: (e) => {
      e.preventDefault()
      beginListening()
    },
    onTouchEnd: (e) => {
      e.preventDefault()
      stopListening()
    },
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {phase === 'success' ? (
          <SuccessView
            transliteration={transliteration}
            script={expected}
            heard={heard}
            label={successLabel}
            onSuccess={onSuccess}
          />
        ) : (
          <>
            <h3 className="text-xl font-extrabold text-slate-800">{prompt}</h3>

            <button
              type="button"
              onClick={() => speakPhrase(blocks)}
              className="mx-auto mt-3 mb-1 block rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-200"
            >
              🔊 Hear it first
            </button>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">{transliteration}</p>
            <p className="script mt-1 text-lg font-semibold text-slate-400">{expected}</p>

            {phase === 'selfcheck' ? (
              <SelfCheck note={note} onPass={() => setPhase('success')} onClose={onClose} />
            ) : (
              <LiveMic
                phase={phase}
                partial={partial}
                heard={heard}
                note={note}
                holdHandlers={holdHandlers}
                onAcceptAnyway={() => setPhase('success')}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

function LiveMic({ phase, partial, heard, note, holdHandlers, onAcceptAnyway }) {
  const recording = phase === 'listening'
  const checking = phase === 'checking'
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <div className="relative grid place-items-center">
        {recording && (
          <>
            <span className="absolute h-28 w-28 rounded-full bg-rose-400/40 animate-pulse-ring" />
            <span
              className="absolute h-28 w-28 rounded-full bg-rose-400/30 animate-pulse-ring"
              style={{ animationDelay: '0.4s' }}
            />
          </>
        )}
        <button
          type="button"
          {...holdHandlers}
          disabled={checking}
          className={`relative grid h-24 w-24 place-items-center rounded-full text-white shadow-xl transition-transform active:scale-95 ${
            recording ? 'scale-110 bg-rose-500' : 'bg-ds-accent hover:bg-ds-accent-hover'
          } ${checking ? 'opacity-70' : ''}`}
        >
          {recording ? (
            <div className="flex items-end gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="wavebar h-8" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          ) : (
            <Mic className="h-10 w-10" />
          )}
        </button>
      </div>

      {/* live transcript while speaking */}
      {recording && partial && (
        <p className="script max-w-xs text-lg font-bold text-rose-500">“{partial}”</p>
      )}

      <p className="text-sm font-semibold text-slate-500">
        {recording
          ? '🎙️ Listening… say it, then let go!'
          : checking
            ? 'Checking…'
            : phase === 'retry'
              ? ''
              : 'Hold the mic and say it in Hindi!'}
      </p>

      {phase === 'retry' && (
        <div className="w-full rounded-2xl bg-amber-50 p-3">
          <p className="text-sm font-bold text-amber-700">Almost — try again! 🙂</p>
          {heard ? (
            <p className="script mt-1 text-base text-amber-800">
              I heard: “{heard}”
            </p>
          ) : (
            <p className="mt-1 text-sm text-amber-700">{note}</p>
          )}
          <button
            type="button"
            onClick={onAcceptAnyway}
            className="mt-2 text-xs font-semibold text-slate-400 underline hover:text-slate-600"
          >
            Teacher: accept this attempt
          </button>
        </div>
      )}
    </div>
  )
}

function SelfCheck({ note, onPass, onClose }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-ds-accent-light text-ds-accent">
        <Ear className="h-9 w-9" />
      </div>
      {note && <p className="text-sm font-semibold text-amber-700">{note}</p>}
      <p className="text-sm font-semibold text-slate-600">
        Say it out loud — then tap ✓ if you said it right.
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-2xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-200"
        >
          Not yet
        </button>
        <button
          type="button"
          onClick={onPass}
          className="rounded-2xl bg-ds-green px-6 py-2.5 text-sm font-extrabold text-white shadow hover:bg-[#246340]"
        >
          ✓ I said it!
        </button>
      </div>
      <p className="mt-1 text-[11px] text-slate-400">
        (This device can't auto-listen — the child/teacher confirms.)
      </p>
    </div>
  )
}

function SuccessView({ transliteration, script, heard, label, onSuccess }) {
  return (
    <div className="animate-pop-in py-4">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-100">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-ds-green text-white">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-extrabold text-ds-green">Perfect! 🎉</h3>
      <p className="mt-1 text-2xl font-extrabold text-slate-800">{transliteration}</p>
      <p className="script text-base font-semibold text-slate-400">{script}</p>
      {heard && (
        <p className="mt-1 text-xs text-slate-400">
          <RotateCcw className="mr-1 inline h-3 w-3" />
          heard: “{heard}”
        </p>
      )}
      <button
        type="button"
        onClick={onSuccess}
        className="mt-6 w-full rounded-2xl bg-ds-green px-6 py-3 text-lg font-extrabold text-white shadow-lg hover:bg-[#246340] active:scale-95"
      >
        {label}
      </button>
    </div>
  )
}
