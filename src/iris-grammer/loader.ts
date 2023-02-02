import * as fs from 'fs'
export function loader(outfile:string,
    symbol:string, transpile:string) {
    let res = `
    if (stack[i] == '${symbol}') {
        let res = \`${transpile}\`+'\\n'
        fs.writeFileSync(outputFile,res)
    }
`
    fs.appendFileSync(outfile, res)
}
export function unloader(outfile:string,
    symbol:string, transpile:string) {
    let res = `
    if (stack[i] == '${symbol}') {
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }
`
    fs.appendFileSync(outfile, res)
}