#!/usr/bin/env node

import * as fs from 'fs'
import * as process from 'process'
import * as yaml from 'js-yaml'

import * as init from './init'
import * as variable from './var'
import * as reassign_variable from './revar'
import * as imports from './import'
import * as loader from './loader'
import * as blocks from './blocks'
import * as func from './func'
import * as statements from './statements'
import * as classes from './classes'


const args = process.argv.slice(2)


/* Input and Ouput File Parameters on args */
const infile = args[0]
const outfile = args[1]
const regex_mode = args[2]

export function grammer(infile, outfile) {
    // Declarative Compiler Constructor - DCC
    let source = fs.readFileSync(infile,'utf8')
    const doc: any = yaml.load(source)
    
    /* YAML Declarations */
    let input_file_extension = doc.input_extension
    let output_file_extension = doc.output_extension
    init.init_compiler(outfile,input_file_extension,output_file_extension, regex_mode)
   
    function this_var() {

        variable.typed_variable(outfile, doc.var_assignment.symbol,
            doc.var_assignment.syntax, doc.var_assignment.null_value,
            doc.var_assignment.transpile0, doc.var_assignment.transpile1,
            doc.var_assignment.transpile2, doc.var_assignment.array_auxiliary_symbol,
        
            doc.var_assignment.typedef.integer.from, doc.var_assignment.typedef.integer.to,
            doc.var_assignment.typedef.float.from,doc.var_assignment.typedef.float.to,
            doc.var_assignment.typedef.string.from, doc.var_assignment.typedef.string.to,
            doc.var_assignment.typedef.bool.from, doc.var_assignment.typedef.bool.to
        )
    }
    this_var();

    function this_revar() {
        reassign_variable.reassign_variable(outfile,
            doc.var_reassignment.symbol, doc.var_reassignment.syntax,
            doc.var_assignment.null_value, doc.var_reassignment.transpile0
        )
    }
    this_revar();

    function this_import() {  
        imports.imports(
            outfile, doc.import.syntax, doc.import.symbol,
            doc.import.transpile
        )
    }
    this_import();


    function this_load() {
        loader.loader(
            outfile, doc.begin.symbol, doc.begin.transpile
        )
    }
    this_load();

    function this_unload() {
        loader.unloader(
            outfile, doc.end.symbol, doc.end.transpile
        )
    }
    this_unload();


    function this_openblock() {
        blocks.block(outfile,doc.open_block.symbol,doc.open_block.transpile)
    }
    function this_closeblock() {
        blocks.block(outfile,doc.close_block.symbol,doc.close_block.transpile)
    }
    this_openblock();
    this_closeblock();


    function this_func() {
        func.func(outfile, doc.function_definition.syntax,
            doc.function_definition.symbol,
            doc.function_definition.transpile)

        func.func_return(outfile, doc.function_return.symbol,
            doc.function_return.syntax,
            doc.function_return.transpile)
    }
    this_func();

    function this_func_call() {
        func.func_call(outfile,
            doc.function_call.syntax.slice(0,1),
            doc.function_call.transpile
        )
    }
    this_func_call();

    function this_conditionals() {
        statements.conditionals(
            outfile, doc.if_elseif_else.if_symbol,
            doc.if_elseif_else.elseif_symbol,
            doc.if_elseif_else.else_symbol,

            doc.if_elseif_else.transpile_if,
            doc.if_elseif_else.transpile_elseif,
            doc.if_elseif_else.transpile_else,

            doc.if_elseif_else.if_syntax,
            doc.if_elseif_else.elseif_syntax
        )
    }
    this_conditionals();


    function this_forwhile() {
        statements.while_statement(outfile,
            doc.while_statement.symbol,
            doc.while_statement.transpile,
            doc.while_statement.syntax
        )
        statements.for_statement(outfile,
            doc.for_statement.symbol,
            doc.for_statement.transpile,
            doc.for_statement.syntax)
    }
    this_forwhile();


    function this_trycatch() {
        statements.try_catch(outfile,
            doc.try_catch_finally.symbol_try,
            doc.try_catch_finally.symbol_catch,
            doc.try_catch_finally.symbol_finally,
            
            doc.try_catch_finally.transpile_try,
            doc.try_catch_finally.transpile_catch,
            doc.try_catch_finally.transpile_finally
        )
    }
    if(doc.try_catch_finally) {
        this_trycatch();
    }

    function this_class() {
        classes.classes(outfile,
            doc.class_definition.symbol,
            doc.class_definition.inheritance_symbol,
            doc.class_definition.syntax,
            doc.class_definition.transpile1,
            doc.class_definition.transpile2
        )
    }
    if(doc.class_definition) {
        this_class();
    }

    

    function this_break() {
        statements.break_continue_statement(outfile,
            doc.break.symbol, doc.break.transpile)
    }
    this_break();
    function this_continue() {
        statements.break_continue_statement(outfile,
            doc.continue.symbol, doc.continue.transpile)
    }
    if(doc.continue) {
        this_continue();
    }
    

    function times() {
        statements.times(outfile,doc.times_statement.symbol)
    }
    times();
    

    function this_comment() {
        blocks.comment(outfile,
            doc.comment.symbol,
            doc.comment.transpile
        )
    }
    this_comment();

    init.end_compiler(outfile)
}

grammer(infile, outfile)