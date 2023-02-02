import * as fs from 'fs'
export function conditionals(outfile:string,
    if_symbol:string, elseif_symbol:string,
    else_symbol:string,

    transpile_if:string, transpile_elseif:string,
    transpile_else:string, syntax_if:string,
    syntax_elseif:string) {

    let syntax_if_o = syntax_if.toString().split(' ')
    let statement_index_if = syntax_if_o.indexOf("statement")

    let syntax_elseif_o = syntax_elseif.toString().split(' ')
    let statement_index_elseif = syntax_elseif_o.indexOf("statement")

    
    let res_if = `
    if (stack[i] == '${if_symbol}') {
        let statement = stack[i+${statement_index_if}].slice(1,-1)
        let res = \`${transpile_if}\`
        if (stack[i+${statement_index_if+1}]) {
            fs.appendFileSync(outputFile,res)
        }
    }
`
    let res_elseif = `
    if (stack[i] == '${elseif_symbol}') {
        let statement = stack[i+${statement_index_elseif}].slice(1,-1)
        let res = \`${transpile_elseif}\`
        if (stack[i+${statement_index_elseif+1}]) {
            fs.appendFileSync(outputFile,res)
        }
    }
    `
    let res_else = `
    if (stack[i] == '${else_symbol}') {
        let res = \`${transpile_else}\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }`

    fs.appendFileSync(outfile, res_if)
    fs.appendFileSync(outfile, res_elseif)
    fs.appendFileSync(outfile, res_else)
}

export function while_statement(outfile:string, symbol:string,
    transpile:string, syntax:any) {
        let syntax_o = syntax.toString().split(' ')
        let statement_index = syntax_o.indexOf("statement")
        let res = `
        if (stack[i] == '${symbol}') {
            let statement = stack[i+${statement_index}].slice(1,-1).slice(1,-1)
            let res = \`${transpile}\`+'\\n'
            fs.appendFileSync(outputFile,res)
        }`

    fs.appendFileSync(outfile, res)
}
export function for_statement(outfile:string, symbol:string,
    transpile:string, syntax:any) {
        let syntax_o = syntax.toString().split(' ')
        let iter_index = syntax_o.indexOf("iter")
        let low_index = syntax_o.indexOf("low")
        let max_index = syntax_o.indexOf("max")

        let res = `
        if (stack[i] == '${symbol}') {
            let iter = stack[i+${iter_index}]
            let low = stack[i+${low_index}]
            let max = stack[i+${max_index}]
            let res = \`${transpile}\`+'\\n'
            fs.appendFileSync(outputFile,res)
        }`

    fs.appendFileSync(outfile, res)
}

export function try_catch(outfile:string, symbol_try:string,
    symbol_catch: string, symbol_finally: string,
    transpile_try:string, transpile_catch: string,
    transpile_finally:string) {
        let res = `
        // Exception
        if (stack[i] == '${symbol_try}') {
            let res = "${transpile_try}"+'\\n'
            fs.appendFileSync(outputFile,res)
        }
        if (stack[i] == '${symbol_catch}') {
            let exception_type = stack[i+1]
            let res = \`${transpile_catch}\`+'\\n'
            fs.appendFileSync(outputFile,res)
        }
        if (stack[i] == '${symbol_finally}') {
            let res = "${transpile_finally}"+'\\n'
            fs.appendFileSync(outputFile,res)
        }`
    fs.appendFileSync(outfile, res)
}

export function break_continue_statement(outfile:string,
    symbol:string,transpile:string) {
    let res = `
    if (stack[i] == '${symbol}') {
        let res = '${transpile}'+'\\n'
        fs.appendFileSync(outputFile,res)
    }
    `
    fs.appendFileSync(outfile,res)
}
export function times(outfile:string,
    symbol:string) {
    let repeat_index = -1
    let res = `
    if (stack[i] == '${symbol}') {
        let times = stack[i+${repeat_index}]
        let res = \`for (let i=0; i<\${times}; i++) {\`+'\\n'
        fs.appendFileSync(outputFile,res)
    }
    `
    fs.appendFileSync(outfile,res)
}