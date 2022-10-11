import { description, subtitle, title, multiline } from './parts'

export const avaliableFormats = (formats: string[]) =>
  `Avaliable formats: ${formats.join(', ')}`

export const help = (appName: string, formats: string[]) => multiline(
  title('PS2 Codes CLI'),
  subtitle('The tool for parsing and converting cheat codes'),
  'Usage:',
  `* Converting: ${appName} <source_format> <input_path> <target_format> <target_path>`,
  `* Print info: ${appName} <input_path>`,
  avaliableFormats(formats)
)

export const fileInfo = (format: string, size: number, cheatsCount: number) => multiline(
  description('Format', format),
  description('File length', size.toString()),
  description('Cheats count', cheatsCount.toString())
)

export const convertingSuccess = (format: string, size: number, cheatsCount: number) => multiline(
  title('The transformation was successful'),
  fileInfo(format, size, cheatsCount)
)
