import { useMatrix, MODES } from '../context/MatrixContext.jsx'
import logo from '../assets/ds-learning-logo.png'

export default function Header() {
  const { mode, setMode } = useMatrix()

  return (
    <header className="sticky top-0 z-30 border-b border-ds-border bg-ds-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
        {/* Brand lockup: DS Learning logo + wordmark + product name */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="DS Learning"
            className="h-11 w-11 rounded-full shadow-sm ring-1 ring-ds-border"
          />
          <div className="leading-tight">
            <p className="font-serif text-lg font-bold text-ds-ink">
              DS Learning
              <span className="ml-2 hidden align-middle text-xs font-semibold uppercase tracking-widest text-ds-accent sm:inline">
                Language Matrix
              </span>
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ds-ink-light">
              Preparing for Life
            </p>
          </div>
        </div>

        {/* 3-way mode toggle */}
        <nav className="flex w-full gap-1 rounded-xl bg-ds-warm p-1 ring-1 ring-ds-border sm:w-auto">
          {MODES.map((m) => {
            const active = m.id === mode
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold transition-all sm:flex-none ${
                  active
                    ? 'bg-ds-accent text-white shadow-sm'
                    : 'text-ds-ink-soft hover:bg-white'
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
