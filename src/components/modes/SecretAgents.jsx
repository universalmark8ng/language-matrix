import { useMemo, useState } from 'react'
import { Radio, Zap, RefreshCw, Volume2 } from 'lucide-react'
import { byId, byType } from '../../data/blocks.js'
import { speak, speakPhrase } from '../../lib/speech.js'
import Block from '../Block.jsx'
import Slot from '../Slot.jsx'
import MicModal from '../MicModal.jsx'

const YEH = 'util_002' // This
const HAI = 'util_003' // Is
const KYA = 'util_001' // What

// Question is always the fixed circuit: Yeh → Kya → Hai? (What is this?)
const QUESTION = [YEH, KYA, HAI]

function randomNoun(excludeId) {
  const nouns = byType('noun').filter((n) => n.id !== excludeId)
  return nouns[Math.floor(Math.random() * nouns.length)]
}

export default function SecretAgents() {
  const [target, setTarget] = useState(() => randomNoun())
  const [answer, setAnswer] = useState([YEH, null, HAI]) // middle slot to solve
  const [pendingId, setPendingId] = useState(null)
  const [micOpen, setMicOpen] = useState(false)
  const [done, setDone] = useState(false)

  const solved = answer[1] === target.id
  const answerBlocks = answer.map((id) => (id ? byId(id) : null))

  // Inventory for Agent 2: structural words + every thing, so the puzzle is real.
  const tray = useMemo(() => [byId(YEH), byId(HAI), ...byType('noun')], [])

  function place(id) {
    // Only the middle slot is solvable; tapping fills it.
    setAnswer((prev) => {
      const next = [...prev]
      next[1] = id
      return next
    })
    setPendingId(null)
  }

  function newMission() {
    setTarget((t) => randomNoun(t.id))
    setAnswer([YEH, null, HAI])
    setPendingId(null)
    setDone(false)
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      {/* ===== Agent 1: The Inquirer ===== */}
      <section className="rounded-3xl bg-gradient-to-br from-ds-dark to-[#11181F] p-5 text-white shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-extrabold">
            <Radio className="h-5 w-5 text-ds-gold" /> Agent 1 · The Inquirer
          </h2>
          <span className="rounded-full bg-ds-gold/15 px-2 py-0.5 text-xs font-bold text-ds-gold-light">
            ASKING
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {QUESTION.map((id, i) => {
            const b = byId(id)
            return (
              <div key={id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speak(b)}
                  className={`flex flex-col items-center rounded-xl px-4 py-2 font-bold shadow ${b.ui_color}`}
                >
                  <span className="text-xl">{b.emoji}</span>
                  <span className="text-base font-extrabold">{b.target_transliteration}</span>
                  <span className="script text-xs opacity-70">{b.target_script}</span>
                </button>
                {i < QUESTION.length - 1 && <span className="font-black text-ds-gold">→</span>}
              </div>
            )
          })}
          <span className="text-3xl font-black text-ds-gold">?</span>
        </div>

        <button
          type="button"
          onClick={() => speakPhrase(QUESTION.map(byId))}
          className="mt-4 flex items-center gap-2 rounded-xl bg-ds-gold px-4 py-2 text-sm font-extrabold text-ds-ink hover:bg-[#E0A43B]"
        >
          <Volume2 className="h-4 w-4" /> Play Question — "What is this?"
        </button>
      </section>

      {/* Connection line */}
      <div className="relative flex h-10 items-center justify-center">
        <div
          className={`h-1.5 w-2/3 rounded-full transition-all ${
            solved
              ? 'bg-gradient-to-r from-ds-gold via-[#E0A43B] to-ds-accent shadow-[0_0_20px_4px_rgba(224,164,59,0.55)]'
              : 'bg-slate-300'
          }`}
        />
        <span
          className={`absolute grid h-9 w-9 place-items-center rounded-full transition-all ${
            solved ? 'bg-ds-gold text-ds-ink animate-pulse scale-110' : 'bg-slate-300 text-slate-500'
          }`}
        >
          <Zap className={`h-5 w-5 ${solved ? 'fill-slate-900' : ''}`} />
        </span>
      </div>

      {/* ===== Agent 2: The Responder ===== */}
      <section className="rounded-3xl bg-gradient-to-br from-ds-green to-[#163024] p-5 text-white shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-extrabold">
            <Radio className="h-5 w-5 text-ds-gold-light" /> Agent 2 · The Responder
          </h2>
          <button
            type="button"
            onClick={newMission}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-ds-gold-light hover:bg-white/20"
          >
            <RefreshCw className="h-3.5 w-3.5" /> New Mission
          </button>
        </div>

        {/* Radar with the hidden item */}
        <div className="mb-4 flex items-center gap-4 rounded-2xl bg-black/30 p-4">
          <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-ds-gold/40 bg-green-950">
            <span className="absolute inset-0 rounded-full border-t-2 border-ds-gold/70 animate-spin [animation-duration:3s]" />
            <span className="text-4xl animate-float">{target.emoji}</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-ds-gold-light">
              Radar Contact
            </p>
            <p className="text-sm text-white/80">
              Answer the question: build{' '}
              <span className="font-bold text-white">
                “This is {/^[aeiou]/i.test(target.english_meaning) ? 'an' : 'a'}{' '}
                {target.english_meaning}”
              </span>
            </p>
          </div>
        </div>

        {/* Answer circuit */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {answer.map((id, i) => (
            <div key={i} className="flex items-center gap-2">
              {i === 1 ? (
                <Slot
                  label="? Thing"
                  filledId={id}
                  pendingId={pendingId}
                  onPlace={place}
                  onClear={() => setAnswer((p) => [p[0], null, p[2]])}
                  hintColor="border-ds-gold/50"
                />
              ) : (
                // Fixed structural blocks (Yeh / Hai) — pre-snapped.
                <FixedBlock block={byId(id)} />
              )}
              {i < answer.length - 1 && <span className="font-black text-ds-gold-light">→</span>}
            </div>
          ))}
        </div>

        {/* Tray */}
        <div className="mt-4">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-wider text-ds-gold-light">
            Pick the right block
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tray.map((b) => (
              <Block
                key={b.id}
                block={b}
                size="sm"
                draggable
                onClick={(blk) => setPendingId(blk.id)}
                selected={pendingId === b.id}
                disabled={answer[1] === b.id}
              />
            ))}
          </div>
        </div>

        {/* Transmit */}
        {solved && (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setMicOpen(true)}
              className="inline-flex animate-pulse items-center gap-2 rounded-2xl bg-gradient-to-r from-ds-gold to-[#E0A43B] px-7 py-4 text-xl font-extrabold text-ds-ink shadow-xl ring-4 ring-ds-gold/30 hover:scale-105 active:scale-95"
            >
              <Zap className="h-6 w-6 fill-slate-900" /> TRANSMIT ENCRYPTED AUDIO
            </button>
          </div>
        )}
      </section>

      <MicModal
        open={micOpen}
        phrase={answerBlocks}
        prompt="Transmit your answer! Read it together:"
        successLabel="📡 Send Transmission!"
        onClose={() => setMicOpen(false)}
        onSuccess={() => {
          setMicOpen(false)
          setDone(true)
        }}
      />

      {done && <MissionResult answerBlocks={answerBlocks} onClose={newMission} />}
    </div>
  )
}

function FixedBlock({ block }) {
  return (
    <button
      type="button"
      onClick={() => speak(block)}
      className={`flex h-28 w-24 flex-col items-center justify-center rounded-2xl font-bold shadow ${block.ui_color}`}
    >
      <span className="text-2xl">{block.emoji}</span>
      <span className="text-base font-extrabold">{block.target_transliteration}</span>
      <span className="text-[10px] uppercase opacity-70">{block.english_meaning}</span>
      <span className="script text-xs opacity-70">{block.target_script}</span>
    </button>
  )
}

function MissionResult({ answerBlocks, onClose }) {
  const script = answerBlocks.map((b) => b.target_script).join(' ')
  const translit = answerBlocks.map((b) => b.target_transliteration).join(' ')
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-ds-green to-[#1F5A3A] p-8 text-center text-white shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-7xl animate-float">🕵️</div>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-ds-gold-light">
          Mission Accomplished
        </p>
        <p className="mt-2 text-2xl font-extrabold">🔓 Code Broken!</p>
        <p className="mt-3 text-2xl font-extrabold">{translit}</p>
        <p className="script text-base font-semibold text-white/70">{script}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-2xl bg-white px-6 py-3 text-lg font-extrabold text-ds-green shadow-lg hover:bg-ds-warm active:scale-95"
        >
          🎯 Next Mission
        </button>
      </div>
    </div>
  )
}
