// webview/editor/utils/frontmatter.ts

/**
 * YAML frontmatter at the very start of a markdown document:
 *   ---\n
 *   key: value\n
 *   ---\n
 *
 * The editor (Tiptap + tiptap-markdown) treats `---` as a thematic break,
 * which corrupts frontmatter on round-trip. We strip it before handing the
 * body to the editor and re-attach it verbatim before persisting back.
 *
 * The `---` fences must be on their own line and the opening fence must be
 * the very first line of the file. Anything else is treated as body content.
 */

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/

export interface SplitMarkdown {
  /** The raw frontmatter block (without surrounding `---` fences), or '' if none. */
  frontmatter: string
  /** The markdown body (everything after the closing fence). */
  body: string
  /** Whether a frontmatter block was actually detected. */
  hasFrontmatter: boolean
}

export function splitFrontmatter(markdown: string): SplitMarkdown {
  const match = markdown.match(FRONTMATTER_RE)
  if (!match) {
    return { frontmatter: '', body: markdown, hasFrontmatter: false }
  }
  return {
    frontmatter: match[1],
    body: markdown.slice(match[0].length),
    hasFrontmatter: true,
  }
}

/**
 * Re-attach a previously-extracted frontmatter block to a body. If
 * `frontmatter` is empty, returns the body unchanged.
 */
export function joinFrontmatter(frontmatter: string, body: string): string {
  if (!frontmatter) return body
  return `---\n${frontmatter}\n---\n${body.startsWith('\n') ? body.slice(1) : body}`
}
