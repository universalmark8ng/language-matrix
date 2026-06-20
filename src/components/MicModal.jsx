import { useEffect, useRef, useState } from 'react'
import { Mic, Check, X } from 'lucide-react'
import { speakPhrase } from '../lib/speech.js'

/**
 * Simulated speech-recognition modal.
 *
 * The kids press & hold (or click) the mic, see a pulsing waveform, and on
 * release the prototype *always* succeeds after 1.5s — keeping the game moving
 * without real ASR. Real recognition can later replace the timeout in
 * `finishRecording` without touching callers.
 *
 * Props:
 *  - open: boolean
 *  - phrase: array of block objects to chant (also shown as the prompt)
 *  - prompt: optional heading override
 *  - successLabel: button text on the success screen
 *  - onSuccess(): fired after the success animation when the child taps continue
 *  - onClose(): dismiss without finishing
 */
export default function MicModal({
  open,
  phrase = [],
  prompt = 'Read it out loud!',
  successLabel = 'Yay! Continue →',
  onSuccess,
  onClose,
}) {
  const [phase, setPhase] = useState('idle') // idle | recording | success
  const timerRef = useRef(null)

  // Reset whenever the modal (re)opens.
  useEffect(() => {
    if (open) setPhase('idle')
    return () => clearTimeout(timerRef.current)
  }, [open])

  if (!open) return null

  const transliteration = phrase
    .filter(Boolean)
    .map((b) => b.target_transliteration)
    .join(' ')
  const script = phrase
    .filter(Boolean)
    .map((b) => b.target_script)
    .join(' ')

  function startRecording() {
    if (phase !== 'idle') return
    setPhase('recording')
  }

  function finishRecording() {
    if (phase !== 'recording') return
    // 1.5s → guaranteed match (prototype behaviour).
    timerRef.current = setTimeout(() => setPhase('success'), 1500)
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {phase !== 'success' ? (
          <>
            <h3 className="text-xl font-extrabold text-slate-800">{prompt}</h3>

            <button
              type="button"
              onClick={() => speakPhrase(phrase)}
              className="mx-auto mt-3 mb-1 block rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-200"
            >
              🔊 Hear it first
            </button>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">{transliteration}</p>
            <p className="script mt-1 text-lg font-semibold text-slate-400">{script}</p>

            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="relative grid place-items-center">
                {phase === 'recording' && (
                  <>
                    <span className="absolute h-28 w-28 rounded-full bg-rose-400/40 animate-pulse-ring" />
                    <span
                      className="absolute h-28 w-28 rounded-full bg-rose-400/30 animate-pulse-ring"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </>
                )}
                <button
                  type="button"
                  // Press-and-hold on both pointer and touch; click also works.
                  onMouseDown={startRecording}
                  onMouseUp={finishRecording}
                  onMouseLeave={() => phase === 'recording' && finishRecording()}
                  onTouchStart={(e) => {
                    e.preventDefault()
                    startRecording()
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    finishRecording()
                  }}
                  className={`relative grid h-24 w-24 place-items-center rounded-full text-white shadow-xl transition-transform active:scale-95 ${
                    phase === 'recording'
                      ? 'bg-rose-500 scale-110'
                      : 'bg-indigo-500 hover:bg-indigo-600'
                  }`}
                >
                  {phase === 'recording' ? (
                    <div className="flex items-end gap-1 text-white">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className="wavebar h-8"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Mic className="h-10 w-10" />
                  )}
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                {phase === 'recording'
                  ? '🎙️ Listening… let go when you finish!'
                  : 'Hold the mic and say it!'}
              </p>
            </div>
          </>
        ) : (
          <div className="animate-pop-in py-4">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-100">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-green-500 text-white">
                <Check className="h-10 w-10" strokeWidth={3} />
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-green-600">Perfect! 🎉</h3>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">{transliteration}</p>
            <p className="script text-base font-semibold text-slate-400">{script}</p>
            <button
              type="button"
              onClick={onSuccess}
              className="mt-6 w-full rounded-2xl bg-green-500 px-6 py-3 text-lg font-extrabold text-white shadow-lg hover:bg-green-600 active:scale-95"
            >
              {successLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
