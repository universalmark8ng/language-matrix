import { useState } from 'react'
import { Volume2, Wind } from 'lucide-react'
import { BREATHY_PAIRS, VOWEL_PAIRS } from '../../data/sounds.js'
import { speak } from '../../lib/speech.js'

// Pronunciation reference (colloquial, no script teaching). Tap a card to hear
// the letter sound followed by a familiar example word.
async function play(sound) {
  await speak(sound.hi, { rate: 0.7 }) // the bare sound
  await speak(sound.word, { rate: 0.8 }) // …then a word that uses it
}

function SoundCard({ sound, tone }) {
  const [busy, setBusy] = useState(false)
  const tones = {
    plain: 'bg-[#2E3E52] text-white',
    breathy: 'bg-[#C4582B] text-white',
    vowel: 'bg-[#E0A43B] text-[#1C2632]',
  }
  return (
    <button
      type="button"
      onClick={async () => {
        setBusy(true)
        await play(sound)
        setBusy(false)
      }}
      className={`relative flex w-[104px] shrink-0 flex-col items-center gap-0.5 rounded-2xl px-3 py-3 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 ${tones[tone]} ${busy ? 'animate-wiggle' : ''}`}
    >
      <Volume2 className="absolute right-2 top-2 h-3.5 w-3.5 opacity-80" />
      <span className="script text-3xl font-bold leading-none">{sound.hi}</span>
      <span className="token text-xl font-extrabold leading-none">{sound.roman}</span>
      <span className="mt-1 text-base leading-none">{sound.emoji}</span>
      <span className="token text-xs font-bold leading-tight">{sound.tr}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wide opacity-75">{sound.en}</span>
    </button>
  )
}

export default function SoundLab() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Breathy pairs */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ds-border">
        <h2 className="font-serif text-lg font-bold text-ds-ink">
          💨 Soft & Breathy Sounds
        </h2>
        <p className="mt-1 text-sm text-ds-ink-soft">
          Each pair is the <strong>same mouth shape</strong> — the{' '}
          <span className="font-bold text-ds-accent">breathy one</span> just adds a
          puff of air (like the “h”). English writes them the same; Hindi keeps them
          apart. Tap to hear the sound, then a word.
        </p>

        <div className="mt-4 space-y-3">
          {BREATHY_PAIRS.map((pair) => (
            <div
              key={pair.plain.roman}
              className="flex items-center gap-2 rounded-xl bg-ds-warm/60 p-2"
            >
              <SoundCard sound={pair.plain} tone="plain" />
              <div className="flex shrink-0 flex-col items-center px-1 text-ds-accent">
                <Wind className="h-5 w-5" />
                <span className="text-[10px] font-bold uppercase tracking-wide">+ puff</span>
                <span className="text-lg font-black leading-none">→</span>
              </div>
              <SoundCard sound={pair.breathy} tone="breathy" />
            </div>
          ))}
        </div>
      </section>

      {/* Vowels */}
      <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ds-border">
        <h2 className="font-serif text-lg font-bold text-ds-ink">🅰️ Short & Long Vowels</h2>
        <p className="mt-1 text-sm text-ds-ink-soft">
          Same vowel, but <strong>hold the long one longer</strong>: “a” vs “aaa”.
        </p>
        <div className="mt-4 space-y-3">
          {VOWEL_PAIRS.map((pair) => (
            <div
              key={pair.short.roman}
              className="flex items-center gap-2 rounded-xl bg-ds-warm/60 p-2"
            >
              <SoundCard sound={pair.short} tone="vowel" />
              <span className="shrink-0 px-2 text-sm font-bold text-ds-ink-light">
                short → long
              </span>
              <SoundCard sound={pair.long} tone="vowel" />
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-ds-ink-light">
        This is a pronunciation helper for colloquial Hindi — not the written
        alphabet. The Devanagari is shown only as a reference.
      </p>
    </div>
  )
}
