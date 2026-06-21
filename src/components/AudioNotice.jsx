import { useEffect, useState } from 'react'
import { Volume2, X } from 'lucide-react'
import { onHindiVoiceChange, ttsAvailable } from '../lib/speech.js'

// Quietly warns the teacher when the device has no Hindi (hi-IN) voice, so they
// can install one — otherwise words are read by the default voice and won't
// sound truly Hindi. Dismissible; only shows when relevant.
export default function AudioNotice() {
  const [hasHindi, setHasHindi] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => onHindiVoiceChange(setHasHindi), [])

  // Give voices a moment to load before deciding to warn.
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 1500)
    return () => clearTimeout(t)
  }, [])

  if (!ttsAvailable() || hasHindi || dismissed || !settled) return null

  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-1.5 text-xs text-amber-800">
        <Volume2 className="h-4 w-4 shrink-0" />
        <span>
          <strong>No Hindi voice found on this device.</strong> Words still play in
          the default voice. For real Hindi audio, add a Hindi (hi-IN) voice in
          your device's Speech / Text-to-Speech settings.
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full hover:bg-amber-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
