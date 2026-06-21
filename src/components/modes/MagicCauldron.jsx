import { useEffect, useState } from 'react'
import { Sparkles, RotateCcw } from 'lucide-react'
import { getBlock as byId } from '../../data/curriculum.js'
import { useMatrix } from '../../context/MatrixContext.jsx'
import { speak, speakPhrase } from '../../lib/speech.js'
import Block from '../Block.jsx'
import Slot from '../Slot.jsx'
import MicModal from '../MicModal.jsx'

// Elemental cards = describing words + things (adjective + noun).
const CARD_TYPES = ['adjective', 'noun']

export default function MagicCauldron() {
  const { byType } = useMatrix()
  const [slots, setSlots] = useState([null, null])
  const [pendingId, setPendingId] = useState(null)
  const [fused, setFused] = useState(false)
  const [micOpen, setMicOpen] = useState(false)
  const [result, setResult] = useState(null)

  const both = slots[0] && slots[1]
  const blocks = slots.map((id) => (id ? byId(id) : null))

  // Trigger the fuse animation a beat after the second card lands.
  useEffect(() => {
    if (both && !fused) {
      const t = setTimeout(() => {
        setFused(true)
        speakPhrase(blocks)
      }, 600)
      return () => clearTimeout(t)
    }
    if (!both && fused) setFused(false)
  }, [both, fused]) // eslint-disable-line react-hooks/exhaustive-deps

  function place(id) {
    setSlots((prev) => {
      if (prev.includes(id)) return prev
      const idx = prev[0] ? (prev[1] ? null : 1) : 0
      if (idx === null) return prev
      const next = [...prev]
      next[idx] = id
      return next
    })
    setPendingId(null)
  }

  function clearSlot(i) {
    setSlots((prev) => {
      const next = [...prev]
      next[i] = null
      return next
    })
    setFused(false)
  }

  function reset() {
    setSlots([null, null])
    setPendingId(null)
    setFused(false)
    setResult(null)
  }

  function cast() {
    setResult(buildCreature(blocks[0], blocks[1]))
    setMicOpen(false)
  }

  const usedIds = slots.filter(Boolean)

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Cauldron */}
      <section className="relative w-full max-w-xl rounded-2xl bg-gradient-to-b from-ds-cream to-ds-warm p-6 text-center shadow-sm ring-1 ring-ds-border">
        <h2 className="font-serif text-lg font-bold text-ds-ink">🧪 Magic Cauldron</h2>
        <p className="mb-4 text-sm font-semibold text-ds-ink-soft">
          Drop two cards in the pot to brew a spell!
        </p>

        <div className="relative mx-auto w-fit">
          {/* bubbling rim */}
          <div className="relative grid place-items-center rounded-[2.5rem] rounded-b-[3rem] border-8 border-ds-dark bg-gradient-to-b from-[#3E9C68] to-ds-green px-6 pb-8 pt-6 shadow-inner">
            {/* bubbles */}
            {fused &&
              [0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="absolute bottom-6 h-3 w-3 rounded-full bg-lime-200/80 animate-bubble"
                  style={{ left: `${15 + i * 18}%`, animationDelay: `${i * 0.25}s` }}
                />
              ))}

            {!fused ? (
              <div className="flex items-center gap-3">
                <Slot
                  filledId={slots[0]}
                  label="Card 1"
                  pendingId={pendingId}
                  onPlace={place}
                  onClear={() => clearSlot(0)}
                  hintColor="border-white/70"
                />
                <span className="text-3xl font-black text-white/80">+</span>
                <Slot
                  filledId={slots[1]}
                  label="Card 2"
                  pendingId={pendingId}
                  onPlace={place}
                  onClear={() => clearSlot(1)}
                  hintColor="border-white/70"
                />
              </div>
            ) : (
              // Fused spell block
              <button
                type="button"
                onClick={() => speakPhrase(blocks)}
                className="flex animate-pop-in flex-col items-center gap-1 rounded-2xl bg-gradient-to-br from-[#F0C36A] to-ds-gold px-8 py-5 text-ds-ink shadow-xl ring-4 ring-white/70"
              >
                <Sparkles className="h-6 w-6" />
                <span className="text-3xl leading-none">
                  {blocks[0].emoji}
                  {blocks[1].emoji}
                </span>
                <span className="text-2xl font-extrabold">
                  {blocks[0].target_transliteration} {blocks[1].target_transliteration}
                </span>
                <span className="script text-base font-bold opacity-70">
                  {blocks[0].target_script} {blocks[1].target_script}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {fused && (
            <button
              type="button"
              onClick={() => setMicOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-ds-accent to-ds-gold px-7 py-4 text-xl font-extrabold text-white shadow-xl ring-4 ring-ds-accent/25 hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-6 w-6" /> CAST SPELL!
            </button>
          )}
          {usedIds.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-500 shadow hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          )}
        </div>
      </section>

      {/* Elemental cards */}
      <section className="w-full max-w-3xl rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ds-border">
        <h3 className="mb-3 text-center text-sm font-extrabold uppercase tracking-wider text-ds-ink-soft">
          ✨ Elemental Cards — tap to hear, drag to the pot
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {byType(...CARD_TYPES).map((b) => (
            <Block
              key={b.id}
              block={b}
              size="md"
              draggable
              onClick={(blk) => {
                speak(blk)
                setPendingId(blk.id)
              }}
              selected={pendingId === b.id}
              disabled={usedIds.includes(b.id)}
            />
          ))}
        </div>
      </section>

      <MicModal
        open={micOpen}
        phrase={blocks}
        prompt="Chant your spell out loud! 🪄"
        successLabel="💥 Summon the Creature!"
        onClose={() => setMicOpen(false)}
        onSuccess={cast}
      />

      {result && <SpellResult result={result} onClose={reset} />}
    </div>
  )
}

// Generate a mythical hybrid from the two cards.
function buildCreature(a, b) {
  // Order doesn't matter to kids; describe with whichever is the adjective.
  const adj = a.type === 'adjective' ? a : b.type === 'adjective' ? b : a
  const noun = adj === a ? b : a
  const creatures = {
    Apple: 'Saber-Toothed Fruit Dragon',
    Cat: 'Whisker-Storm Tiger',
    Car: 'Rocket-Wheel Beast',
    Robot: 'Mega Mecha-Titan',
    Monster: 'Cave-Shaking Behemoth',
  }
  const base = creatures[noun.english_meaning] || 'Mystery Beast'
  return {
    script: `${a.target_script} ${b.target_script}`,
    translit: `${a.target_transliteration} ${b.target_transliteration}`,
    name: `${adj.english_meaning} ${base}`,
    emoji: `${a.emoji}${b.emoji}`,
  }
}

function SpellResult({ result, onClose }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-ds-dark/85 p-4 backdrop-blur"
      onClick={onClose}
    >
      {/* particle burst */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-3 w-3 rounded-full animate-burst"
          style={{
            left: '50%',
            top: '42%',
            background: ['#E0A43B', '#C4582B', '#3E9C68', '#FDF6E3'][i % 4],
            transform: `rotate(${i * 26}deg) translateY(-${120 + (i % 3) * 30}px)`,
            animationDelay: `${(i % 5) * 0.05}s`,
          }}
        />
      ))}
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-ds-accent to-[#9C4A1F] p-8 text-center text-white shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-7xl animate-float">{result.emoji}</div>
        <p className="mt-2 text-sm font-bold uppercase tracking-widest text-ds-gold-light">
          Spell Successful!
        </p>
        <p className="mt-1 text-2xl font-extrabold">{result.translit}</p>
        <p className="script text-base font-semibold text-fuchsia-200/80">{result.script}</p>
        <div className="mt-5 rounded-2xl bg-white/15 px-4 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-ds-gold-light">
            You summoned
          </p>
          <p className="text-2xl font-extrabold">✨ {result.name} ✨</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-2xl bg-white px-6 py-3 text-lg font-extrabold text-ds-accent shadow-lg hover:bg-ds-warm active:scale-95"
        >
          🔁 Brew Another Spell
        </button>
      </div>
    </div>
  )
}
