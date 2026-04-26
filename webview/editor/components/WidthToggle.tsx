// webview/editor/components/WidthToggle.tsx
import { useEffect, useState, useCallback } from 'react'
import { Maximize2, Minimize2 } from 'lucide'
import { LucideIcon } from './LucideIcon'

const STORAGE_KEY = 'pmtoolkit.editor.fullWidth'

function readInitial(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Floating toggle for the editor's width mode. Adds/removes `is-full-width`
 * on `#editor`; CSS handles prose vs. wide-block columns and the override.
 */
export function WidthToggle() {
  const [fullWidth, setFullWidth] = useState<boolean>(readInitial)

  useEffect(() => {
    const root = document.getElementById('editor')
    if (!root) return
    root.classList.toggle('is-full-width', fullWidth)
    try {
      localStorage.setItem(STORAGE_KEY, fullWidth ? '1' : '0')
    } catch {
      // ignore storage errors (e.g. disabled storage)
    }
  }, [fullWidth])

  const toggle = useCallback(() => setFullWidth((v) => !v), [])

  return (
    <button
      type="button"
      className="width-toggle"
      onClick={toggle}
      title={fullWidth ? 'Switch to default width' : 'Switch to full width'}
      aria-label={fullWidth ? 'Switch to default width' : 'Switch to full width'}
      aria-pressed={fullWidth}
    >
      <LucideIcon icon={fullWidth ? Minimize2 : Maximize2} size={14} strokeWidth={2} />
    </button>
  )
}
