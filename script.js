'use strict'

const { on } = require('events');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const RequestTypes = [
    {
        type : 'send',
        payload : 'to send a document'
    },
    {
        type : 'receive',
        payload : 'to receive a document'
    },
    {
        type : 'sign',
        payload : 'to sign a document'
    },
];

class Customer {
    constructor({type, payload}){
        this.type = type;
        this.payload = payload;
    }
}

const generateIntInRange = (min, max)=>{
    return Math.floor(Math.random() * (max - min +1) + min)
};

const generateNewCustomer = ()=>{
    const randomTypeIndex = generateIntInRange(0, RequestTypes.length - 1);
    const randomCustomerType = RequestTypes[randomTypeIndex];
    return new Customer(randomCustomerType)
}

// console.log(generateNewCustomer())

const run = async() =>{
    const { type, payload } = generateNewCustomer();
    const delay = generateIntInRange(1000, 5000);

    emitter.emit(type, payload);
    await new Promise(resolve => setTimeout(resolve, delay))
    await run()
} 

class Handlers {
    static send(payload) {
        console.log('Send request:', payload);
    }
    static receive(payload) {
        console.log('Receive request:', payload);
    }
    static sign(payload) {
        emitter.emit('error', 'Broken pen')
        // console.log('Sign request:', payload);
    }
}

emitter.on('send', Handlers.send);
emitter.on('receive', Handlers.receive);
emitter.on('sign', Handlers.sign);
emitter.on('error', console.log)

run();
// emitter.on('send', console.log);
// emitter.emit('send', 'Msg');
 