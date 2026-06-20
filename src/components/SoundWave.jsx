// Animated equaliser bars. Used on speaking blocks and inside the mic modal.
export default function SoundWave({ bars = 5, className = '', active = true }) {
  return (
    <div className={`flex items-end gap-[3px] h-5 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="wavebar"
          style={{
            height: '100%',
            animationDelay: `${i * 0.12}s`,
            animationPlayState: active ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  )
}
