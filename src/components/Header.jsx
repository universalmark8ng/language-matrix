import { useMatrix, MODES } from '../context/MatrixContext.jsx'

export default function Header() {
  const { mode, setMode } = useMatrix()

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
          🤖 Language Matrix
          <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 align-middle text-xs font-bold uppercase tracking-wide text-indigo-500">
            Prototype
          </span>
        </h1>

        {/* 3-way mode toggle */}
        <nav className="flex w-full gap-1 rounded-2xl bg-slate-200/70 p-1 sm:w-auto">
          {MODES.map((m) => {
            const active = m.id === mode
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold transition-all sm:flex-none ${
                  active
                    ? `${m.accent} text-white shadow-md`
                    : 'text-slate-600 hover:bg-white/70'
                }`}
              >
                <span className="text-lg">{m.emoji}</span>
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
