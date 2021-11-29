#!/usr/bin/env node


const fs = require('fs');
// const yargs = require('yargs')
const path = require('path')
// const readline = require('readline');
const inquirer = require('inquirer');

let currentDirectory = process.cwd();


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}
const list = fs.readdirSync(currentDirectory)
// const list = fs.readdirSync(currentDirectory).filter(isFile)

let  funcInquire = (listq) =>{ 
    inquirer
.prompt([{
        name: 'fileName',
        type: 'list',
        message: 'Choose file',
        choices: listq,
}])
.then((answer) => {
    console.log(answer.fileName);
    currentDirectory = currentDirectory +"/"+answer.fileName;
    if(!fs.lstatSync(currentDirectory).isFile()){
        funcInquire(fs.readdirSync(currentDirectory))
    } else {    
    fs.readFile(currentDirectory, 'utf-8', (err,data)=>{
        if(err) console.log(err)
        else console.log(data)
    })
    }
})
}
funcInquire(list)
// rl.question('Please enter the path to the file', function(inputedPath){
//     const filePath = path.join(__dirname, inputedPath);
//     fs.readFile(filePath, 'utf-8', (err,data)=>{
//         if(err) console.log(err)
//         else console.log(data)
//     })
// })

// rl.on('close', function() {
//     process.exit(0) 
// })

// const options = yargs
//     .usage('Path: -p <path>')
//     .option('p', {alias:'path', describe: 'Path to file', type: 'string',
//     demandOption: true })
//     .argv;

// const filePath = path.join(__dirname, options.path)
// fs.readFile(filePath, 'utf-8', (err,data)=>{
//     if(err) console.log(err)
//     else console.log(data)
// })