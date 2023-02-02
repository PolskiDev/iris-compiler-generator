import * as fs from 'fs'
export function block(outfile:string,
    symbol:string, transpile:string) {
    let res = `
    if (stack[i] == '${symbol}') {
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }
`
    fs.appendFileSync(outfile, res)
}
export function comment(outfile:string,
    symbol:string,
    transpile:string) {
    let comment_index = 1
    let res = `
    if (stack[i] == '${symbol}') {
        let comment = stack[i+${comment_index}]
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }
`
    fs.appendFileSync(outfile, res)
}