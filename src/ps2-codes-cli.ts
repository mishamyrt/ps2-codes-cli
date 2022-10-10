#!/usr/bin/env node

import { argv } from 'process'
import { die, print } from './console'
import { formats, assumeFormat, FormatKey } from 'ps2-codes'
import { avaliableFormats, fileInfo, help } from './templates'
import { readTextFile } from './fs'

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

async function convertFile (filePath: string, input: FormatKey, output: FormatKey) {
  const content = await readTextFile(filePath)
  const cheats = formats[input].fromString(content)
  print(
    formats[output].toString(cheats)
  )
}

async function main (args: string[]) {
  if (args.length !== 1 && args.length !== 3) {
    print(
      help(appName, formatList)
    )
    die('Wrong arguments count. Should be 1 or 3')
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
  const targetFormat = args[1]
  if (!isCorrectFormat(targetFormat)) {
    print(
      avaliableFormats(formatList)
    )
    die(`Unknown target format '${targetFormat}'`)
  }
  await convertFile(args[2], sourceFormat, targetFormat)
}

main(argv.slice(2))
