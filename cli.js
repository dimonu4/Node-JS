#!/usr/bin/env node


const fs = require('fs');
const yargs = require('yargs')
const path = require('path')
const readline = require('readline');
const inquirer = require('inquirer');
// const readLine = require('readLine');

let currentDirectory = process.cwd();
// let readStream

// const rl = readline.createInterface({
//     input: readStream,
//     terminal: true
// })

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}
const list = fs.readdirSync(currentDirectory)
// const list = fs.readdirSync(currentDirectory).filter(isFile)


const options = yargs
    .usage('Path: -s <search>')
    .option('s', {alias:'search', describe: 'Search word', type: 'string',
    demandOption: false })
    .argv;

    // console.log(options.s)

let reg = new RegExp(options.s,'g') 

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
    // fs.readFile(currentDirectory, 'utf-8', (err,data)=>{
    //     if(err) console.log(err)
    //     else {
    //         console.log(data)
    //         console.log(reg.exec(data))
    //     }
    // })
    let coincidence = []
    const readStream = fs.createReadStream(currentDirectory, 'utf-8')
    const rl = readline.createInterface({
        input: readStream,
        terminal: true
    })

    rl.on('line', (line)=>{
        if(reg.test(line)){
            // coincidence.push(line)
            console.log('find coincidence:')
        }
        console.log(line)
    })
    console.log("search:"+coincidence)
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

// const filePath = path.join(__dirname, options.path)
// fs.readFile(filePath, 'utf-8', (err,data)=>{
//     if(err) console.log(err)
//     else console.log(data)
// })