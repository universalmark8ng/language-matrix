import { GraduationCap, BookOpen } from 'lucide-react'
import { useMatrix } from '../context/MatrixContext.jsx'

// Teacher-facing curriculum selector: pick a Level (Review / Grade 3 / …) and a
// Unit. The chosen unit's vocabulary drives all three activities. Also surfaces
// the CBSE theme + skill focus so the curriculum stays visible during a lesson.
export default function UnitPicker() {
  const { levels, active, unit, selectLevel, selectUnit } = useMatrix()
  const currentLevel = levels.find((l) => l.id === active.levelId)

  return (
    <div className="border-b border-ds-border bg-white/60">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        {/* Level */}
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ds-ink-light">
          <GraduationCap className="h-4 w-4 text-ds-accent" />
          <select
            value={active.levelId}
            onChange={(e) => selectLevel(e.target.value)}
            className="rounded-lg border border-ds-border bg-white px-2 py-1 text-sm font-bold normal-case tracking-normal text-ds-ink outline-none focus:border-ds-accent"
          >
            {levels.map((l) => (
              <option key={l.id} value={l.id} disabled={l.locked || !l.units.length}>
                {l.title}
                {l.locked ? ' · coming soon' : ''}
              </option>
            ))}
          </select>
        </label>

        {/* Unit */}
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ds-ink-light">
          <BookOpen className="h-4 w-4 text-ds-accent" />
          <select
            value={active.unitId}
            onChange={(e) => selectUnit(e.target.value)}
            className="rounded-lg border border-ds-border bg-white px-2 py-1 text-sm font-bold normal-case tracking-normal text-ds-ink outline-none focus:border-ds-accent"
          >
            {(currentLevel?.units || []).map((u, i) => (
              <option key={u.id} value={u.id}>
                {i + 1}. {u.title} · {u.hindi}
              </option>
            ))}
          </select>
        </label>

        {/* Theme + focus */}
        {unit && (
          <div className="hidden items-center gap-2 text-xs text-ds-ink-soft md:flex">
            <span className="rounded-full bg-ds-accent-light px-2 py-0.5 font-semibold text-ds-accent">
              {unit.cbse}
            </span>
            <span className="italic">{unit.focus}</span>
          </div>
        )}
      </div>
    </div>
  )
}
