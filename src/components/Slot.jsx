import { useState } from 'react'
import { X } from 'lucide-react'
import { getBlock as byId } from '../data/curriculum.js'
import { speak } from '../lib/speech.js'

/**
 * A drop target in a syntax track / circuit.
 *
 * Supports BOTH interactions so it works on desktop and touch:
 *  - native HTML5 drag-and-drop (drop a Block here)
 *  - tap-to-place: parent passes `pendingId`; tapping an empty slot calls
 *    `onPlace(pendingId)`.
 *
 * `accepts` (array of block types) gives gentle validation feedback but never
 * blocks the kids — wrong types are accepted and simply not highlighted green.
 */
export default function Slot({
  label,
  filledId,
  accepts,
  onPlace,
  onClear,
  pendingId,
  hintColor = 'border-slate-300',
}) {
  const [over, setOver] = useState(false)
  const block = filledId ? byId(filledId) : null

  const pending = pendingId ? byId(pendingId) : null
  const tappable = !block && pending

  function handleDrop(e) {
    e.preventDefault()
    setOver(false)
    const id = e.dataTransfer.getData('text/plain')
    if (id) onPlace?.(id)
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        onClick={() => {
          if (block) {
            speak(block)
          } else if (tappable) {
            onPlace?.(pendingId)
          }
        }}
        className={`relative grid h-28 w-28 place-items-center rounded-2xl border-4 border-dashed transition-all ${
          block
            ? `border-solid ${block.ui_color} shadow-lg`
            : over || tappable
              ? 'border-indigo-400 bg-indigo-50 scale-105'
              : `${hintColor} bg-white/60`
        } ${tappable ? 'cursor-pointer animate-float' : block ? 'cursor-pointer' : ''}`}
      >
        {block ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClear?.()
              }}
              aria-label="Remove"
              className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-white text-slate-500 shadow hover:text-rose-500"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="text-2xl leading-none">{block.emoji}</span>
            <span className="text-base font-extrabold leading-tight">
              {block.target_transliteration}
            </span>
            <span className="script text-sm font-semibold opacity-70">{block.target_script}</span>
          </>
        ) : (
          <span className="px-1 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
            {tappable ? 'Tap to place' : label}
          </span>
        )}
      </div>
    </div>
  )
}
