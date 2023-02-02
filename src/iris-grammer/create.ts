#!/usr/bin/env node

import * as fs from 'fs'
import * as process from 'process'
const args = process.argv.slice(2)


/* Input and Ouput File Parameters on args */
const file = args[0]
const opmode = args[1]

function createFromTemplate(file, opmode) {
    if (opmode == '--oop-default') {
        fs.writeFileSync(file,fs.readFileSync('oop.txt', 'utf8'))
    }
    if (opmode == '--procedural-default') {
        fs.writeFileSync(file,fs.readFileSync('proc.txt', 'utf8'))
    } else {
        console.log("\n\nProcedural template:  iris-create <file>.yaml --procedural-default")
        console.log("Procedural template:  iris-create <file>.yaml --oop-default\n\n")
    }
}

createFromTemplate(file, opmode)