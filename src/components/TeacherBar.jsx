import { useState } from 'react'
import { Star, ClipboardList, ChevronUp, ChevronDown, Trash2 } from 'lucide-react'
import { useMatrix, MODES } from '../context/MatrixContext.jsx'

// Persistent bottom overlay for the teacher to log live performance feedback.
export default function TeacherBar() {
  const { mode, teacherLog, logEntry, clearLog } = useMatrix()
  const [stars, setStars] = useState(0)
  const [hover, setHover] = useState(0)
  const [notes, setNotes] = useState('')
  const [open, setOpen] = useState(false)
  const [flash, setFlash] = useState(false)

  const modeLabel = MODES.find((m) => m.id === mode)?.label ?? mode

  function save() {
    if (!stars && !notes.trim()) return
    logEntry({ stars, notes: notes.trim() })
    setStars(0)
    setNotes('')
    setFlash(true)
    setTimeout(() => setFlash(false), 900)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30">
      {/* Expandable log history */}
      {open && (
        <div className="mx-auto max-h-56 max-w-5xl overflow-y-auto rounded-t-2xl border border-b-0 border-slate-200 bg-white px-4 py-3 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700">
              <ClipboardList className="h-4 w-4" /> Session Log ({teacherLog.length})
            </h4>
            {teacherLog.length > 0 && (
              <button
                type="button"
                onClick={clearLog}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-rose-500 hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
          {teacherLog.length === 0 ? (
            <p className="py-3 text-center text-sm text-slate-400">
              No entries yet — rate a round below to start logging.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {teacherLog.map((e) => (
                <li
                  key={e.id}
                  className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-sm"
                >
                  <span className="font-mono text-xs text-slate-400">{e.at}</span>
                  <span className="rounded bg-ds-accent-light px-1.5 text-xs font-semibold text-ds-accent">
                    {MODES.find((m) => m.id === e.mode)?.emoji} {e.mode}
                  </span>
                  <span className="text-amber-400">{'★'.repeat(e.stars)}</span>
                  {e.notes && <span className="text-slate-600">{e.notes}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Always-visible control bar */}
      <div className="border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold uppercase tracking-wide text-slate-500 hover:bg-slate-100"
          >
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            Teacher
          </button>

          <span className="hidden text-xs font-semibold text-slate-400 sm:inline">
            {modeLabel}
          </span>

          {/* 5-star rating */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setStars(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
                className="p-0.5"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    n <= (hover || stars)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && save()}
            placeholder="Quick note (pronunciation, engagement…)"
            className="min-w-[140px] flex-1 rounded-xl border border-ds-border bg-ds-warm px-3 py-1.5 text-sm text-ds-ink outline-none focus:border-ds-accent focus:bg-white"
          />

          <button
            type="button"
            onClick={save}
            className={`rounded-xl px-4 py-1.5 text-sm font-extrabold text-white shadow transition-colors ${
              flash ? 'bg-ds-green' : 'bg-ds-accent hover:bg-ds-accent-hover'
            }`}
          >
            {flash ? 'Saved ✓' : 'Log'}
          </button>
        </div>
      </div>
    </div>
  )
}
