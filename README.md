# IRIS - Instruction Recognition for Integrated Software
### A declarative (ahead of time) compiler generator

#### Author: Gabriel Margarido
###### Developed by Gabriel Margarido and Licensed as Free Software under FreeBSD 2-clause license

<center><img src="IRIS.png" width="60%"></center>


- Uses transpilation to translate from your generated programming language  to the goal language. It can be basically every high-level or low-level programming language.

- Very lightweight transpiler/compiler generator tool

- Supporting interoperability with the chose base-language, like Java and Kotlin do.

- The generated compiler is built from a YAML file to a Javascript/Node.js file.

- Uses regular expressions to validate and split source-code files into lines of code to each token.


*Note: All arrays/vectors are actually tuples, it means they are immutable after initiliazed. You can append or remove elements by using array handling functions from your after-compiled language, for instance,
in javascript you can use `arr.push(value)` to insert elements and `arr.pop()` or `arr.shift()` to remove the last or the first element of an array. Handling functions can differ on each base-language (In this case, ee are giving examples in Javascript).



### Install Node.js with:
Ubuntu: `sudo apt install nodejs npm -y`

Fedora: `sudo dnf install nodejs npm -y`
  
Also you can get Node from [www.nodejs.org](https://nodejs.org)
and VSCode from [code.visualstudio.com](https://code.visualstudio.com)



### Configuring "node_modules"
First of all, configure generation directory and its dependencies with:
`./configure`

##### Examples of YAML source code can be find inside:
`./src/examples/.../<file>.yaml`


### Generating a YAML template
##### Oriented Object Programming
`./iris-create <file>.yaml --oop-default`

##### Procedural Programming
`./iris-create <file>.yaml --procedural-default`


### Creating your own compiler generation in Node.js
- Generate your custom compiler (generation)
using braces `{}` to storage expressions (such as: arrays) with:  

For instance in a fictitious language:
```
if (a > 3) do  
    int a[] = { 0, 1, 2, 3, ...}  
end  
```

`./iris-generate <input>.yaml <output>.js --include-braces`

- Or you can generate your custom compiler (generation)
using braces `{}` as a block of code with: 

For instance in a fictitious language:
```
if (a > 3) {  
    int a[] = ( 0, 1, 2, 3, ... )
}  
```

`./iris-generate <input>.yaml <output>.js --exclude-braces`


### Compiling source-code in your own language with the generated compiler in Node.js
Syntax: `node <generated_compiler>.js <source>.<own_extension>`

Command example: `node vm.js main.xl`


### Compile and run the source-code
Generate compiler: `./iris-generate <input>.yaml <output>.js`

Run compiler: `node <output>.js <source>.cpp`



### Creating your own Visual Studio Code generation - (Work in progress!)
Generate your custom Visual Studio Code syntax highlight (generation)
with:

`./vscode-generate <input>.yaml <output_folder>`



