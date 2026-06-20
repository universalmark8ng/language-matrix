import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const MatrixContext = createContext(null)

export const MODES = [
  { id: 'robot', label: 'Command-A-Robot', emoji: '🤖', accent: 'bg-blue-500' },
  { id: 'cauldron', label: 'Magic Cauldron', emoji: '🧪', accent: 'bg-green-500' },
  { id: 'agents', label: 'Secret Agents', emoji: '🕵️', accent: 'bg-purple-500' },
]

const LOG_KEY = 'language-matrix:teacher-log'

function loadLog() {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function MatrixProvider({ children }) {
  const [mode, setMode] = useState('robot')
  // Teacher control overlay state, persisted across reloads for a testing session.
  const [teacherLog, setTeacherLog] = useState(loadLog)

  useEffect(() => {
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(teacherLog))
    } catch {
      /* storage full / disabled — non-fatal for a prototype */
    }
  }, [teacherLog])

  function logEntry({ stars, notes }) {
    const entry = {
      id: `${teacherLog.length + 1}-${mode}`,
      mode,
      stars,
      notes,
      // Time is captured by the caller (kept out of context to stay testable).
      at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setTeacherLog((log) => [entry, ...log])
    return entry
  }

  function clearLog() {
    setTeacherLog([])
  }

  const value = useMemo(
    () => ({ mode, setMode, teacherLog, logEntry, clearLog }),
    [mode, teacherLog],
  )

  return <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>
}

export function useMatrix() {
  const ctx = useContext(MatrixContext)
  if (!ctx) throw new Error('useMatrix must be used inside <MatrixProvider>')
  return ctx
}
