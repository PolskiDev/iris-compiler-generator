import * as fs from 'fs'
export function func(outfile:string,
    syntax:any,
    symbol:string, transpile:string) {
    
    syntax = syntax.toString().split(' ')
    let typed_index = syntax.indexOf("typed")
    let identifier_index = syntax.indexOf("identifier")
    let args_index = syntax.indexOf("args")

    let res = `
    if (stack[i] == '${symbol}') {
        let typed = stack[i+${typed_index}]
        let identifier = stack[i+${identifier_index}]
        let args = stack[i+${args_index}].slice(1,-1)
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }

`
    fs.appendFileSync(outfile, res)
}

export function func_call(outfile:string,
    delim:string,
    transpile:string) {
    let identifier_index = 1
    let res = `
    if(stack[i].slice(0,1) == '${delim.slice(0,1)}'
    && stack[i-1].match(/[A-Za-z0-9]/)
    && stack[i-2] == undefined && stack[i+1] == undefined) {
        let identifier = stack[i+${identifier_index}-2]
        let args = stack[i].slice(1,-1)
        
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }

`
    fs.appendFileSync(outfile, res)
}

export function func_return(outfile:string,
    symbol:string, syntax:any,
    transpile:string) {

    syntax = syntax.toString().split(' ')
    let retval_index = syntax.indexOf("value")
    let res = `
    if (stack[i] == '${symbol}') {
        let value = stack[i+${retval_index}]
        let res = \`${transpile}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }
    `
    fs.appendFileSync(outfile,res)
}