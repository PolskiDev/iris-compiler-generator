import * as fs from 'fs'
export function reassign_variable(outfile:string,
    symbol:string, syntax:string|string[],
    null_value:string, transpile0:string) {

    syntax = syntax.toString().split(' ')
    let identifier = syntax.indexOf("identifier")
    let value = syntax.indexOf("value")


    let res = `
    if (stack[i] == '${symbol}') {
        let identifier = stack[i+${identifier-1}]
        let value
        let optional_parameter
        let res
        
        /* It has value for variable */
        if (stack[i+1] != '${null_value}') {
            value = stack[i+${value-1}]
            optional_parameter = stack[i+${value+0}]
            optional_parameter2 = stack[i+${value+0}+1]
            
            
            if (optional_parameter != undefined) {
                if (optional_parameter2 != undefined) {
                    res = \`${transpile0}\`+optional_parameter+optional_parameter2+'\\n'
                } else {
                    res = \`${transpile0}\`+optional_parameter+'\\n'
                }
                
            } else {
                res = \`${transpile0}\`+'\\n'
            }
            fs.appendFileSync(outputFile,res)

        /* It does not have value for variable */
        } else {
            let res = stack[i+${identifier-1}]
            fs.appendFileSync(outputFile,res)
        }
    }
`
    fs.appendFileSync(outfile, res)
}
