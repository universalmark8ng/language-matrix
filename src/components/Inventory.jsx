import { TYPE_LABELS } from '../data/curriculum.js'
import { useMatrix } from '../context/MatrixContext.jsx'
import Block from './Block.jsx'

/**
 * Inventory panel that groups blocks by type into labelled trays.
 *
 * @param groups  array of type keys, e.g. ['adjective','noun','verb']
 * @param onPick  (block) => void — used for tap-to-place selection
 * @param pendingId currently selected block id (highlights it)
 * @param usedIds array of ids already placed (renders them dimmed/disabled)
 */
export default function Inventory({ groups, onPick, pendingId, usedIds = [], size = 'sm' }) {
  const { byType } = useMatrix()
  return (
    <div className="space-y-4">
      {groups.map((type) => (
        <div key={type}>
          <h3 className="mb-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-500">
            {TYPE_LABELS[type] ?? type}
          </h3>
          <div className="flex flex-wrap gap-2">
            {byType(type).map((block) => (
              <Block
                key={block.id}
                block={block}
                size={size}
                draggable
                showEnglish
                onClick={onPick}
                selected={pendingId === block.id}
                disabled={usedIds.includes(block.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
