import { useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { getBlock as byId } from '../../data/curriculum.js'
import { speakPhrase } from '../../lib/speech.js'
import Inventory from '../Inventory.jsx'
import Slot from '../Slot.jsx'
import MicModal from '../MicModal.jsx'

// The three ordered slots of the syntax track.
const TRACK = [
  { key: 'adjective', label: 'Adjective Slot' },
  { key: 'noun', label: 'Noun Slot' },
  { key: 'verb', label: 'Verb Slot' },
]

export default function CommandRobot() {
  const [slots, setSlots] = useState({ adjective: null, noun: null, verb: null })
  const [pendingId, setPendingId] = useState(null)
  const [micOpen, setMicOpen] = useState(false)
  const [result, setResult] = useState(null) // {script, translit, line}

  const filled = TRACK.map((t) => slots[t.key]).filter(Boolean)
  const allFilled = filled.length === TRACK.length
  const phrase = TRACK.map((t) => (slots[t.key] ? byId(slots[t.key]) : null))

  // Place a block id into the first slot whose type matches; falls back to the
  // first empty slot so tapping always does *something* satisfying.
  function place(id, explicitKey) {
    const block = byId(id)
    if (!block) return
    setSlots((prev) => {
      const next = { ...prev }
      const key =
        explicitKey ||
        (next[block.type] === null ? block.type : TRACK.find((t) => !next[t.key])?.key)
      if (key) next[key] = id
      return next
    })
    setPendingId(null)
  }

  function clearSlot(key) {
    setSlots((prev) => ({ ...prev, [key]: null }))
  }

  function reset() {
    setSlots({ adjective: null, noun: null, verb: null })
    setPendingId(null)
    setResult(null)
  }

  function runCommand() {
    const [adj, noun, verb] = phrase
    setResult({
      script: phrase.map((b) => b.target_script).join(' '),
      translit: phrase.map((b) => b.target_transliteration).join(' '),
      line: buildActionLine(adj, noun, verb),
    })
    setMicOpen(false)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      {/* Left: inventory */}
      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ds-border">
        <h2 className="mb-3 font-serif text-lg font-bold text-ds-ink">🧱 Block Inventory</h2>
        <Inventory
          groups={['adjective', 'noun', 'verb']}
          onPick={(b) => setPendingId(b.id)}
          pendingId={pendingId}
          usedIds={filled}
        />
        <p className="mt-4 text-center text-xs font-semibold text-ds-ink-light">
          Drag a block into a slot — or tap a block, then tap a slot.
        </p>
      </section>

      {/* Right: syntax track */}
      <section className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-ds-cream to-ds-warm p-6 shadow-sm ring-1 ring-ds-border">
        <h2 className="mb-1 font-serif text-lg font-bold text-ds-ink">⚙️ Syntax Track</h2>
        <p className="mb-5 text-sm font-semibold text-ds-ink-soft">
          Build the command in order, then run it!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {TRACK.map((t, i) => (
            <div key={t.key} className="flex items-center gap-2">
              <Slot
                label={t.label}
                filledId={slots[t.key]}
                accepts={[t.key]}
                pendingId={pendingId}
                onPlace={(id) => place(id, t.key)}
                onClear={() => clearSlot(t.key)}
              />
              {i < TRACK.length - 1 && (
                <span className="text-2xl font-black text-ds-accent/40">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Live phrase readout */}
        {filled.length > 0 && (
          <button
            type="button"
            onClick={() => speakPhrase(phrase)}
            className="token mt-5 rounded-full bg-white px-5 py-2 text-xl font-bold text-ds-ink shadow ring-1 ring-ds-border hover:bg-ds-warm"
          >
            🔊 {phrase.filter(Boolean).map((b) => b.target_transliteration).join(' ')}
          </button>
        )}

        {/* Action trigger */}
        <div className="mt-6 flex items-center gap-3">
          {allFilled && (
            <button
              type="button"
              onClick={() => setMicOpen(true)}
              className="flex animate-pulse items-center gap-2 rounded-2xl bg-gradient-to-r from-ds-accent to-[#E0A43B] px-7 py-4 text-xl font-extrabold text-white shadow-xl ring-4 ring-ds-accent/25 hover:scale-105 active:scale-95"
            >
              <Play className="h-6 w-6 fill-white" /> RUN CODE!
            </button>
          )}
          {filled.length > 0 && (
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

      <MicModal
        open={micOpen}
        phrase={phrase}
        prompt="Command the Robot! Read it out loud:"
        successLabel="⚡ Execute Command!"
        onClose={() => setMicOpen(false)}
        onSuccess={runCommand}
      />

      {result && <RobotResult result={result} onClose={reset} />}
    </div>
  )
}

// Builds a funny "robot executing" line from the chosen blocks.
function buildActionLine(adj, noun, verb) {
  const verbFx = {
    Eat: 'CHOMP CHOMP! 😋 Munching the',
    Run: 'ZOOM ZOOM! 🏃 Racing past the',
    Stop: 'EEEK— SCREECH! ✋ Freezing by the',
    Look: 'BEEP BOOP! 👀 Scanning the',
  }
  const lead = verbFx[verb.english_meaning] || 'WHIRR! Robot acting on the'
  return `${lead} ${adj.english_meaning} ${noun.english_meaning} ${noun.emoji}!`
}

function RobotResult({ result, onClose }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#2E3E52] to-ds-dark p-8 text-center text-white shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-7xl animate-float">🤖</div>
        <p className="mt-2 text-sm font-bold uppercase tracking-widest text-ds-cream/70">
          Command Executed
        </p>
        <p className="mt-2 text-3xl font-extrabold">{result.translit}</p>
        <p className="script text-lg font-semibold text-blue-200/80">{result.script}</p>
        <div className="mt-5 rounded-2xl bg-white/15 px-4 py-4 text-2xl font-extrabold">
          {result.line}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-2xl bg-white px-6 py-3 text-lg font-extrabold text-ds-accent shadow-lg hover:bg-ds-warm active:scale-95"
        >
          🔁 Build Another Command
        </button>
      </div>
    </div>
  )
}
