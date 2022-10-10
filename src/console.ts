import { stdout, stderr } from 'process'
import pc from 'picocolors'

export function print (message: string) {
  stdout.write(message + '\n')
}

export function die (message: string): never {
  stderr.write(
    pc.red(message) + '\n'
  )
  process.exit(1)
}
