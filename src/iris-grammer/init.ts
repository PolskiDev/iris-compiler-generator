import * as fs from 'fs'
export function end_compiler(file) {
    fs.appendFileSync(file,`}\n})} compile();`)
}

export function init_compiler(file, input_ext, output_ext, regex_mode) {
    let regex_form
    if (regex_mode == '--include-braces') {
        regex_form = /[A-Za-z0-9_$++::.,@#><>=<=>===:=]+|"[^"]+"|"[^"]+"|\\([^)]*\\)|\\{[^)]*\\}|\\[[^\\]]*\\]|(:)|(=)/gi
    } else if (regex_mode == '--exclude-braces') {
        regex_form = /[A-Za-z0-9_$++::.,@#><>=<=>===:={}]+|"[^"]+"|"[^"]+"|\\([^)]*\\)|(:)|(=)/gi
    } else {
        regex_form = /[A-Za-z0-9_$++::.,@#><>=<=>===:={}]+|"[^"]+"|"[^"]+"|\\([^)]*\\)|(:)|(=)/gi
    }
    
    fs.writeFileSync(file,
    `
    const fs = require('fs')
    let inputfile
    let outputFile
    let args = process.argv.slice(2)

        inputfile = args[0];
        outputFile = inputfile.replace("${input_ext}","${output_ext}") // DO NOT MODIFY
        optional_parameter = args[1]
    
    /* Compile source-code */
    function compile() {
        let regex = ${regex_form}
        let source = fs.readFileSync(inputfile,'utf8')
       
        source.split(/\\r?\\n/).forEach(line =>  {
            let stack = line.match(regex)
    
            /**
             * @error  stack.lenght
             * @fix    stack?.length
             */
            for (let i = 0; i < stack?.length; i++) {
                process.stdout.write("("+stack[i]+") ")
    `)
}
