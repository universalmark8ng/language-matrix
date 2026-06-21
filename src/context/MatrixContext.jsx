import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  LEVELS,
  PLAYABLE_LEVELS,
  findUnit,
  firstUnitOf,
  getBlock,
  DEFAULT_LEVEL,
  DEFAULT_UNIT,
} from '../data/curriculum.js'

const MatrixContext = createContext(null)

export const MODES = [
  { id: 'robot', label: 'Command-A-Robot', emoji: '🤖', accent: 'bg-ds-accent' },
  { id: 'cauldron', label: 'Magic Cauldron', emoji: '🧪', accent: 'bg-ds-accent' },
  { id: 'agents', label: 'Secret Agents', emoji: '🕵️', accent: 'bg-ds-accent' },
]

const LOG_KEY = 'language-matrix:teacher-log'
const UNIT_KEY = 'language-matrix:active-unit'

function loadLog() {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadUnit() {
  try {
    const raw = localStorage.getItem(UNIT_KEY)
    const saved = raw ? JSON.parse(raw) : null
    if (saved && findUnit(saved.levelId, saved.unitId)) return saved
  } catch {
    /* ignore */
  }
  return { levelId: DEFAULT_LEVEL, unitId: DEFAULT_UNIT }
}

export function MatrixProvider({ children }) {
  const [mode, setMode] = useState('robot')
  const [active, setActive] = useState(loadUnit) // { levelId, unitId }
  const [teacherLog, setTeacherLog] = useState(loadLog)

  useEffect(() => {
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(teacherLog))
    } catch {
      /* storage full / disabled — non-fatal for a prototype */
    }
  }, [teacherLog])

  useEffect(() => {
    try {
      localStorage.setItem(UNIT_KEY, JSON.stringify(active))
    } catch {
      /* ignore */
    }
  }, [active])

  const unit = findUnit(active.levelId, active.unitId) || firstUnitOf(DEFAULT_LEVEL)

  // Select a level (jumps to its first unit) or a specific unit.
  const selectLevel = useCallback((levelId) => {
    const first = firstUnitOf(levelId)
    if (first) setActive({ levelId, unitId: first.id })
  }, [])
  const selectUnit = useCallback(
    (unitId) => setActive((a) => ({ ...a, unitId })),
    [],
  )

  // Vocabulary lookup, scoped to the ACTIVE unit (themed words). Function words
  // are resolved globally via byId (getBlock).
  const byType = useCallback(
    (...types) => (unit?.blocks || []).filter((b) => types.includes(b.type)),
    [unit],
  )
  const byId = getBlock

  function logEntry({ stars, notes }) {
    const entry = {
      id: `${teacherLog.length + 1}-${mode}`,
      mode,
      unit: unit?.title,
      stars,
      notes,
      at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setTeacherLog((log) => [entry, ...log])
    return entry
  }

  const clearLog = () => setTeacherLog([])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      // curriculum
      levels: LEVELS,
      playableLevels: PLAYABLE_LEVELS,
      active,
      unit,
      selectLevel,
      selectUnit,
      byType,
      byId,
      // teacher
      teacherLog,
      logEntry,
      clearLog,
    }),
    [mode, active, unit, byType, selectLevel, selectUnit, teacherLog],
  )

  return <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
}

export function useMatrix() {
  const ctx = useContext(MatrixContext)
  if (!ctx) throw new Error('useMatrix must be used inside <MatrixProvider>')
  return ctx
}
