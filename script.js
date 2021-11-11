const fs = require('fs');
const {Transfrom, Transform} = require('stream');
const ACCESS_LOG = './access.log';
// const fsPromises = require('fs/promises');

// const data = fs.readFileSync(ACCESS_LOG, {
//     encoding: 'utf-8'
// });
// console.log(data.toString())
// console.log(data)

// fs.readFile(ACCESS_LOG, 'utf-8', (err, data)=>{
// if(err) console.log(err);
// else console.log(data);
// })

// fsPromises.readFile(ACCESS_LOG, 'utf-8')
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log(err)
// })

// const foo = async ()=>{
//     try {
//         const data = await fsPromises.readFile(ACCESS_LOG, 'utf-8');
//     console.log(data)
//     } catch(e){
//         console.log(e)
//     }
    
// }

// foo()

const requests = [
    '127.0.0.1 - - [30/Jan/2021:11:11:25 -0300] "GET /boo HTTP/1.1" 404 0 "-" "curl/7.47.0"',
    '127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"'
];

// fs.writeFile(
//     ACCESS_LOG,
//     requests[1] + '\n',
//     {
//         encoding: 'utf-8',
//         flag: 'a',
//     },
//     (err)=>{
//     if(err) console.log(err)
// });

// fs.appendFile(
//     ACCESS_LOG,
//     requests[1] + '\n',
//     {
//         encoding: 'utf-8',
//     },
//     (err)=>{
//     if(err) console.log(err)
// });

// fs.ReadStream() // class
// fs.createReadStream();

// const readStream = fs.createReadStream(
//     ACCESS_LOG,
//     {
//         flags: 'r',
//         encoding: 'utf-8',
//         // autoClose
//         // start
//         // end
//         highWaterMark: 32,
//     }
// )

// readStream.on('open', ()=>{
//     console.log('File has been opened')
// })

// readStream.on('data', (chunk)=>{
//     console.log('current chunk is: ', chunk)
// })

// readStream.on('end', ()=>{
//     console.log('Finished!')
// })

// readStream.on('error', (err)=>{
//     console.log(err)
// })

// const  writeStream = fs.createWriteStream(
//     ACCESS_LOG,
//     {
//         encoding: 'utf-8',
//         flags: 'a',
//     }
// );

// requests.forEach(logString => {
//     writeStream.write(logString + '\n')
// })

// writeStream.on('end', ()=>{
//     console.log('end')
// })

// writeStream.end(()=>{
//     console.log('end')
// })

const payedAccount = true;
const readStream = fs.createReadStream(ACCESS_LOG);
const tStream = new Transform({
    transform(chunk, encoding, callback){
        if(payedAccount) this.push(chunk);
        else{
            const transformed = chunk.toString().replace(/\d+\.\d+\.\d+\.\d+/g, '[IP had been hidden]');
            this.push(transformed)
        }
        callback()
    }
})

readStream.pipe(tStream).pipe(process.stdout)