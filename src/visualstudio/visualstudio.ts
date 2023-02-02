import * as fs from 'fs'
import * as process from 'process'
import * as yaml from 'js-yaml'
import * as code_src from './code-src'

/* node visualstudio grammervscode.yaml */
const args = process.argv.slice(2)

/* Input and Ouput File Parameters on args */
const infile = args[0]
const outfile = args[1]


export function visualstudio(infile, outfile) {
    // Declarative Compiler Constructor - DCC
    let source = fs.readFileSync(infile,'utf8')
    const doc: any = yaml.load(source)
    
    /* YAML Declarations */
    fs.mkdirSync(`${outfile}/syntaxes`,{ recursive: true })
        code_src.packageJson(outfile,
            doc.config.display_name,
            doc.config.description,
            doc.config.version,
            doc.config.id,
            doc.config.extension
        )
        code_src.languageConfiguration(outfile,
            doc.syntax.comment
        )
        code_src.tmLanguage(outfile,
            doc.config.display_name,
            doc.syntax.control,
            doc.syntax.modifier,
            doc.config.extension,
            doc.config.id
        )
}

visualstudio(infile, outfile)