// Tiny wrapper around the Web Speech API (SpeechSynthesis). Real device voices
// produce genuine Hindi audio when a hi-IN voice is installed; otherwise it
// gracefully degrades to the default voice (still useful for the prototype).

import { languagePack } from '../data/curriculum.js'

let cachedVoice
let voicesReady = false

function pickVoice() {
  if (cachedVoice) return cachedVoice
  const synth = window.speechSynthesis
  if (!synth) return undefined
  const voices = synth.getVoices()
  if (!voices.length) return undefined
  const lang = languagePack.speech_lang.toLowerCase()
  cachedVoice =
    voices.find((v) => v.lang?.toLowerCase() === lang) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(lang.split('-')[0])) ||
    undefined
  return cachedVoice
}

// Voices load asynchronously in most browsers.
if (typeof window !== 'undefined' && window.speechSynthesis) {
  const warm = () => {
    voicesReady = true
    cachedVoice = undefined
    pickVoice()
  }
  window.speechSynthesis.onvoiceschanged = warm
  warm()
}

/**
 * Speak a block (or any {target_script, target_transliteration} object).
 * Returns a promise that resolves when speech ends (or immediately if TTS
 * is unavailable) so callers can chain UI feedback.
 */
export function speak(textOrBlock, { rate = 0.85 } = {}) {
  return new Promise((resolve) => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
    const text =
      typeof textOrBlock === 'string'
        ? textOrBlock
        : textOrBlock?.target_script || textOrBlock?.target_transliteration || ''

    if (!synth || !text) {
      resolve(false)
      return
    }

    synth.cancel() // never let utterances pile up for impatient 8-year-olds
    const u = new SpeechSynthesisUtterance(text)
    const voice = pickVoice()
    if (voice) u.voice = voice
    u.lang = languagePack.speech_lang
    u.rate = rate
    u.pitch = 1.05
    u.onend = () => resolve(true)
    u.onerror = () => resolve(false)
    synth.speak(u)
  })
}

/** Speak a sequence of blocks separated by short pauses (one utterance). */
export function speakPhrase(blockList, opts) {
  const text = blockList
    .filter(Boolean)
    .map((b) => (typeof b === 'string' ? b : b.target_script))
    .join(' ')
  return speak(text, opts)
}

export const ttsAvailable = () =>
  typeof window !== 'undefined' && !!window.speechSynthesis
