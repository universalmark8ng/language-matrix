// Audio for the vocabulary.
//
// Two-tier playback:
//   1. If a block carries a pre-recorded clip (`block.audioUrl`), play that —
//      device-independent, guaranteed Hindi. (No clips ship yet; this is the
//      hook for adding them later without touching callers.)
//   2. Otherwise fall back to the Web Speech API (SpeechSynthesis) using the
//      device's hi-IN voice. Real Hindi when a Hindi voice is installed;
//      otherwise the default voice still reads the transliteration.
//
// `hindiVoiceAvailable()` lets the UI warn the teacher if the device has no
// Hindi voice (so words won't sound truly Hindi until one is installed).

import { languagePack } from '../data/curriculum.js'

const LANG = languagePack.speech_lang // 'hi-IN'
const BASE = LANG.split('-')[0] // 'hi'

let cachedVoice
let hasHindiVoice = false
const listeners = new Set()

function refreshVoices() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  if (!synth) return
  const voices = synth.getVoices()
  if (!voices.length) return

  const lc = (v) => v.lang?.toLowerCase() || ''
  // Prefer an exact hi-IN match; then any Hindi; gently favour "natural"/Google
  // voices when several exist.
  const hindi = voices
    .filter((v) => lc(v) === LANG.toLowerCase() || lc(v).startsWith(BASE))
    .sort((a, b) => score(b) - score(a))
  cachedVoice = hindi[0]
  const nowHas = !!cachedVoice
  if (nowHas !== hasHindiVoice) {
    hasHindiVoice = nowHas
    listeners.forEach((fn) => fn(hasHindiVoice))
  }
}

function score(v) {
  let s = 0
  if (v.lang?.toLowerCase() === LANG.toLowerCase()) s += 2
  if (/google|natural|neural|premium/i.test(v.name || '')) s += 1
  if (v.localService) s += 0.5
  return s
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = refreshVoices
  refreshVoices()
}

/** Subscribe to Hindi-voice availability changes. Returns an unsubscribe fn. */
export function onHindiVoiceChange(fn) {
  listeners.add(fn)
  fn(hasHindiVoice)
  return () => listeners.delete(fn)
}

export const hindiVoiceAvailable = () => hasHindiVoice

export const ttsAvailable = () =>
  typeof window !== 'undefined' && !!window.speechSynthesis

function playClip(url) {
  return new Promise((resolve) => {
    try {
      const audio = new Audio(url)
      audio.onended = () => resolve(true)
      audio.onerror = () => resolve(false)
      audio.play().catch(() => resolve(false))
    } catch {
      resolve(false)
    }
  })
}

function speakTTS(text, rate) {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis
    synth.cancel() // never let utterances pile up for impatient 8-year-olds
    const u = new SpeechSynthesisUtterance(text)
    if (cachedVoice) u.voice = cachedVoice
    u.lang = LANG
    u.rate = rate
    u.pitch = 1.05
    u.onend = () => resolve(true)
    u.onerror = () => resolve(false)
    synth.speak(u)
  })
}

/**
 * Speak a block (or any {target_script, audioUrl} object) — or a raw string.
 * Resolves when playback ends (or immediately if no audio is possible).
 */
export async function speak(textOrBlock, { rate = 0.85 } = {}) {
  const isObj = textOrBlock && typeof textOrBlock === 'object'
  if (isObj && textOrBlock.audioUrl) {
    const ok = await playClip(textOrBlock.audioUrl)
    if (ok) return true // else fall through to TTS
  }
  const text =
    typeof textOrBlock === 'string'
      ? textOrBlock
      : textOrBlock?.target_script || textOrBlock?.target_transliteration || ''
  if (typeof window === 'undefined' || !window.speechSynthesis || !text) return false
  return speakTTS(text, rate)
}

/** Speak a sequence of blocks as one utterance. Prefers clips if every block
 *  has one; otherwise reads the joined Devanagari via TTS. */
export async function speakPhrase(blockList, opts) {
  const blocks = blockList.filter(Boolean)
  const allClips = blocks.length && blocks.every((b) => b && b.audioUrl)
  if (allClips) {
    for (const b of blocks) await speak(b, opts)
    return true
  }
  const text = blocks.map((b) => (typeof b === 'string' ? b : b.target_script)).join(' ')
  return speak(text, opts)
}
