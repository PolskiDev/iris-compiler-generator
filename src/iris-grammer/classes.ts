import * as fs from 'fs'
export function classes(outfile:string,
    symbol:string, inheritance_symbol:string, syntax:string|string[],
    transpile1:string, transpile2:string) {
    
    syntax = syntax.toString().split(' ')
    let identifier_index = syntax.indexOf("identifier")
    let inheritance_index = syntax.indexOf("inheritacnce")

    let res = `
    if (stack[i] == '${symbol}') {
        let identifier = stack[i+${identifier_index}]
        if (stack[i+${inheritance_index}] == '${inheritance_symbol}') {
            let inheritance = stack[i+${inheritance_index}]
            let res = \`${transpile2}\`+'\\n'
            fs.appendFileSync(outputFile,res)
        } else {
            let res = \`${transpile1}\`+'\\n'
            fs.appendFileSync(outputFile,res)
        }
    }

`
    fs.appendFileSync(outfile, res)
}
