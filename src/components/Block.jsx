import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { speak } from '../lib/speech.js'
import SoundWave from './SoundWave.jsx'

const SIZES = {
  sm: 'min-w-[88px] px-3 py-2 text-base rounded-xl',
  md: 'min-w-[112px] px-4 py-3 text-lg rounded-2xl',
  lg: 'min-w-[140px] px-5 py-4 text-2xl rounded-2xl',
}

/**
 * A single vocabulary "building block".
 *
 * - Speaks its word on click (HTML5 / Web Speech TTS) and flashes a sound wave.
 * - Optionally draggable (native HTML5 drag-and-drop) for the matrix slots.
 * - `onClick` (if provided) runs *in addition to* speaking, so a parent can
 *   also use a block as a tap-to-place fallback on touch devices.
 */
export default function Block({
  block,
  size = 'md',
  draggable = false,
  onClick,
  onDragStart,
  selected = false,
  showEnglish = true,
  className = '',
  disabled = false,
}) {
  const [speaking, setSpeaking] = useState(false)

  if (!block) return null

  async function handleActivate() {
    if (disabled) return
    setSpeaking(true)
    onClick?.(block)
    await speak(block)
    setSpeaking(false)
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', block.id)
    e.dataTransfer.effectAllowed = 'move'
    onDragStart?.(block, e)
  }

  return (
    <button
      type="button"
      draggable={draggable && !disabled}
      onDragStart={handleDragStart}
      onClick={handleActivate}
      disabled={disabled}
      aria-label={`${block.english_meaning} — ${block.target_transliteration}`}
      className={`
        relative flex flex-col items-center justify-center gap-0.5 font-bold
        shadow-md transition-all duration-150 select-none
        ${SIZES[size]} ${block.ui_color}
        ${draggable && !disabled ? 'cursor-grab active:cursor-grabbing' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-xl active:scale-95'}
        ${selected ? 'ring-4 ring-white ring-offset-2 ring-offset-black/10 -translate-y-0.5' : ''}
        ${speaking ? 'animate-wiggle' : ''}
        ${className}
      `}
    >
      {/* Sound indicator — a speaker normally, live waves while speaking. */}
      <span className="absolute top-1.5 right-1.5 opacity-80">
        {speaking ? (
          <SoundWave bars={3} className="h-3 text-current" />
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
      </span>

      {block.emoji && <span className="text-2xl leading-none">{block.emoji}</span>}
      <span className="script leading-tight">{block.target_script}</span>
      <span className="text-xs font-semibold opacity-90 leading-tight">
        {block.target_transliteration}
      </span>
      {showEnglish && (
        <span className="text-[10px] font-medium uppercase tracking-wide opacity-70 leading-tight">
          {block.english_meaning}
        </span>
      )}
    </button>
  )
}
