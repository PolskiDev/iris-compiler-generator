import * as fs from 'fs'
export function imports(outfile:string,
syntax:any,
symbol:string, transpile:string) {
    
    syntax = syntax.toString().split(' ')
    let name_index = syntax.indexOf("name")
    let path_index = syntax.indexOf("path")

    let res = `
    if (stack[i] == '${symbol}') {
        let name = stack[i+${name_index}]
        let path = stack[i+${path_index}]
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }
`
    fs.appendFileSync(outfile, res)
}
