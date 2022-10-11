# PS Codes CLI [![Quality assurance](https://github.com/mishamyrt/ps2-codes-cli/actions/workflows/qa.yaml/badge.svg)](https://github.com/mishamyrt/ps2-codes-cli/actions/workflows/qa.yaml)

Utility to convert PS2 cheat codes. Uses [ps2-codes](https://github.com/mishamyrt/ps2-codes) as a backend.

## Installation

The utility is available as an NPM package.

```
npm install -g ps2-codes-cli@latest
```

## Usage

### Converting

To convert a file, specify the input and output path and formats.

```sh
npx ps2-codes-cli raw SLUS-21361.txt pnach SLUS-21361.pnach
# The transformation was successful
# Format: pnach
# File length: 842
# Cheats count: 31
```

### Print info

If you specify only the name of the input file, the utility will display the file information. This is useful if you do not know the code format.

```sh
npx ps2-codes-cli codes.txt
# Format: pnach
# File length: 346
# Cheats count: 3
```
