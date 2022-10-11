#!/usr/bin/env node

import { argv } from 'process'
import { die, print } from './console'
import { formats, assumeFormat, FormatKey } from 'ps2-codes'
import { avaliableFormats, fileInfo, help } from './templates'
import { readTextFile } from './fs'
import { writeFile } from 'fs/promises'

const appName = 'ps2-codes-cli'
const formatList = Object.keys(formats)

function isCorrectFormat (x: string): x is FormatKey {
  return x in formats
}

async function printInfo (filePath: string) {
  const content = await readTextFile(filePath)
  const format = assumeFormat(content)
  if (!format) {
    die('Unknown file format')
  }
  const cheats = formats[format].fromString(content)
  print(
    fileInfo(format, content.length, cheats.length)
  )
}

async function convertFile (
  input: FormatKey,
  inputPath: string,
  target: FormatKey,
  targetPath: string
) {
  const content = await readTextFile(inputPath)
  const cheats = formats[input].fromString(content)
  const targetContent = formats[target].toString(cheats)
  await writeFile(targetPath, targetContent)
  print(
    fileInfo(target, targetContent.length, cheats.length)
  )
}

async function main (args: string[]) {
  if (args.length !== 1 && args.length !== 4) {
    print(
      help(appName, formatList)
    )
    die('Wrong arguments count. Should be 1 or 4')
  }

  if (args.length === 1) {
    return printInfo(args[0])
  }

  const sourceFormat = args[0]
  if (!isCorrectFormat(sourceFormat)) {
    print(
      avaliableFormats(formatList)
    )
    die(`Unknown source format '${sourceFormat}'`)
  }
  const targetFormat = args[2]
  if (!isCorrectFormat(targetFormat)) {
    print(
      avaliableFormats(formatList)
    )
    die(`Unknown target format '${targetFormat}'`)
  }
  await convertFile(sourceFormat, args[1], targetFormat, args[3])
}

main(argv.slice(2))
