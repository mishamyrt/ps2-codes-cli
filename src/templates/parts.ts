import pc from 'picocolors'

/**
 * Glues accepted arguments with a line break character
 */
export function multiline (...lines: string[]): string {
  return lines.join('\n')
}

/**
 * Formats the elements with a colon, highlighting the value
 */
export function description (title: string, description: string): string {
  return `${pc.gray(title + ':')} ${description}`
}

/**
 * Formats title
 */
export function title (s: string): string {
  return pc.bold(s)
}

/**
 * Formats title
 */
export function subtitle (s: string): string {
  return pc.gray(s)
}
