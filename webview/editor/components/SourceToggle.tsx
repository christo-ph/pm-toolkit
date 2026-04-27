// webview/editor/components/SourceToggle.tsx
import { useCallback } from 'react'
import { Code2 } from 'lucide'
import { LucideIcon } from './LucideIcon'

/**
 * Floating button that asks the extension to reopen the current file
 * in the default text editor — useful for inspecting raw markdown
 * source side-by-side with the WYSIWYG view.
 */
export function SourceToggle() {
  const onClick = useCallback(() => {
    window.vscode?.postMessage({ type: 'openSourceView' })
  }, [])

  return (
    <button
      type="button"
      className="editor-floating-btn"
      onClick={onClick}
      title="View markdown source (opens beside)"
      aria-label="View markdown source"
    >
      <LucideIcon icon={Code2} size={14} strokeWidth={2} />
    </button>
  )
}
