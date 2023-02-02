import * as fs from 'fs'

export function packageJson(outfile,
    display_name:string, description:string,
    version:string,id:string,extension:string) {
    const packageJsonPath = `${outfile}/package.json`
    let res = `{
    "name": "${id}",
    "displayName": "${display_name}",
    "description": "${description}",
    "version": "${version}",
    "engines": {
        "vscode": "^1.70.0"
    },
    "categories": [
      "Programming Languages"
    ],
    "contributes": {
        "languages": [{
            "id": "${id}",
            "aliases": ["${display_name}", "${id}"],
            "extensions": [".${extension}"],
            "configuration": "./language-configuration.json"
        }],
        "grammars": [{
            "language": "${id}",
            "scopeName": "source.${extension}",
            "path": "./syntaxes/${id}.tmLanguage.json"
        }]
    }
}`
    fs.writeFileSync(packageJsonPath,res)
}
export function languageConfiguration(outfile,comment:string)
{
    const languageConfigurationPath = `./${outfile}/language-configuration.json`
    let res = `{
    "comments": {
        // symbol used for single line comment. Remove this entry if your language does not support line comments
        "lineComment": "${comment}",
        // symbols used for start and end a block comment. Remove this entry if your language does not support block comments
        "blockComment": [ "${comment}", "\\n" ]
    },
    // symbols used as brackets
    "brackets": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ],
    // symbols that are auto closed when typing
    "autoClosingPairs": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        ["\\"", "\\""],
        ["'", "'"]
    ],
    // symbols that can be used to surround a selection
    "surroundingPairs": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        ["\\"", "\\""],
        ["'", "'"]
    ]
}`
    fs.writeFileSync(languageConfigurationPath,res)
}
export function tmLanguage(outfile:string,
    display_name:string, control_keywords:string,
    modifier_keywords:string,
    extension:string, id:string) {
    const tmLanguagePath = `./${outfile}/syntaxes/${id}.tmLanguage.json`
    let res = `{
    "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
    "name": "${display_name}",
    "patterns": [
        {
            "include": "#keywords"
        },
        {
            "include": "#strings"
        },
        {
            "include": "#comments"
        },
        {
            "include": "#numbers"
        },
        {
            "include": "#storage"
        }
    ],
    "repository": {
        "keywords": {
            "patterns": [{
                "name": "keyword.control.${id}",
                "match": "\\\\b(${control_keywords.replace(/:/gi,'|')})\\\\b"
            }]
        },
        "comments": {
            "patterns": [{
                "name": "comment.block.documentation.${id}",
                "begin": "/\\\\*",
                "beginCaptures": {
                    "0": {
                        "name": "punctuation.definition.comment.begin.${id}"
                    }
                },
                "end": "\\\\*/",
                "endCaptures": {
                    "0": {
                        "name": "punctuation.definition.comment.end.${id}"
                    }
                },
                "patterns": [{
                    "include": "#comments"
                }]
            }]
        },
        "strings": {
            "name": "string.quoted.double.${id}",
            "begin": "\\"",
            "end": "\\"",
            "patterns": [
                {
                    "name": "constant.character.escape.${id}",
                    "match": "\\\\\\\\."
                }
            ]
        },
        "numbers": {
            "patterns": [{
                "name": "constant.numeric.exponential.${id}",
                "match": "([0-9]+(_?))+(\\\\.)([0-9]+[eE][-+]?[0-9]+)"
            }, {
                "name": "constant.numeric.float.${id}",
                "match": "([0-9]+(_?))+(\\\\.)([0-9]+)"
            }, {
                "name": "constant.numeric.binary.${id}",
                "match": "(?:0b)(?:(?:[0-1]+)(?:_?))+"
            }, {
                "name": "constant.numeric.octal.${id}",
                "match": "(?:0o)(?:(?:[0-7]+)(?:_?))+"
            }, {
                "name": "constant.numeric.hex.${id}",
                "match": "(?:0x)(?:(?:[0-9a-fA-F]+)(?:_?))+"
            }, {
                "name": "constant.numeric.integer.${id}",
                "match": "(?:(?:[0-9]+)(?:[_]?))+"
            }]
        },
        "storage": {
            "name": "storage.modifier.${id}",
            "match": "\\\\b(${modifier_keywords.replace(/:/gi,'|')})\\\\b"
        }
    },
    "scopeName": "source.${id}"
}`
    fs.writeFileSync(tmLanguagePath, res)
}
