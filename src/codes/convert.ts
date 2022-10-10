import { FormatKey, formats } from 'ps2-codes'

export async function convert (
  source: FormatKey,
  target: FormatKey,
  content: string
): Promise<string> {
  const cheats = await formats[source].fromString(content)
  return formats[target].toString(cheats)
}
