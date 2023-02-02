import * as fs from 'fs'
export function typed_variable(outfile:string,
    symbol:string,
    syntax:string|string[], null_value:string,
    transpile0:string, transpile1:string,
    transpile2:string, array_auxiliary_symbol:string,
    
    int_var0:string, int_var1:string,
    float_var0:string, float_var1:string,
    string_var0:string, string_var1:string,
    bool_var0:string, bool_var1:string) {

    syntax = syntax.toString().split(' ')
    let typed = syntax.indexOf("typed")
    let identifier = syntax.indexOf("identifier")
    let value = syntax.indexOf("value")


    let res = `
    if (stack[i] == '${symbol}') {
        let typed = stack[i+${typed}-2]
        let identifier = stack[i+${identifier}-2]
        let value
        let optional_parameter
        let optional_parameter2


        typed = typed.replace('${int_var0}', '${int_var1}')
        typed = typed.replace('${float_var0}', '${float_var1}')
        typed = typed.replace('${string_var0}', '${string_var1}')
        typed = typed.replace('${bool_var0}', '${bool_var1}')

        /* It has value for variable */
        if (stack[i+1] != '${null_value}') {
            value = stack[i+${value-2}]
            optional_parameter = stack[i+${value-2}+1]
            optional_parameter2 = stack[i+${value-2}+2]
            let res


            if (typed.includes('${array_auxiliary_symbol}')) {
                let res = \`${transpile2}\`+'\\n'
                fs.appendFileSync(outputFile,res)
            
            } else {
                if (optional_parameter != undefined) {
                    if (optional_parameter2 != undefined) {
                        res = \`${transpile1}\`+optional_parameter+optional_parameter2+'\\n'
                    } else {
                        res = \`${transpile1}\`+optional_parameter+'\\n'
                    }
                    
                } else {
                    res = \`${transpile1}\`+'\\n'
                }
                fs.appendFileSync(outputFile,res)
            }
        

        /* It does not have value for variable */
        } else {
            let res = \`${transpile0}\`+'\\n'
            fs.appendFileSync(outputFile,res)
        }
    }
`
    fs.appendFileSync(outfile, res)
}
