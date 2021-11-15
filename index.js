const fs = require('fs');
const {Transform} = require('stream');
const ACCESS_LOG = './access_chunk.log';
const readStream = new fs.createReadStream(ACCESS_LOG);
const arrayIp = ['89.123.1.41', '34.48.240.111']

const tStream = new Transform ({
    transform (chunk, encoding, callback){
        let tChunk = chunk.toString().split('\n');    
            for(let item of tChunk){
                for(let i = 0; i < arrayIp.length; i++){
                    if( item && item.includes(arrayIp[i]) ){
                        const writeStream = fs.createWriteStream(`./%${arrayIp[i]}%_requests.log`, {encoding:'utf-8', flags:'a'})
                        writeStream.write(item)
                }
            }
        }    
        callback()  
    }
})

readStream.pipe(tStream).pipe(process.stdout);