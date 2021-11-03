// Task-1: Record 1, Record 5, Record 6, Record 2, Record 3, Record 4

// Task-2:

const EventEmitter = require('events');
const emitter = new EventEmitter();
let endDateEnter = process.argv.slice(2);
let resultArray = [];
let timerI = 0;

class Timer{
    timer;
    constructor(endDate){
        this.endDate = endDate;
        this.timerI = timerI;
        timerI++;
        this.endDateArray = endDate.split('-')
        this.endYear = this.endDateArray.pop();
        this.endMonth = this.endDateArray.pop();
        this.endDay = this.endDateArray.pop();
        this.endMinutes = this.endDateArray.pop();
        this.endHour = this.endDateArray.pop();
        this.endDateTimer = new Date(`${this.endYear}-${this.endMonth}-${this.endDay}T${this.endHour}:${this.endMinutes}:00`)
        this.startTimer()
    }

     startTimer(){
        this.timer = setInterval(this.tic.bind(this), 1000)
    }

    tic(){
            let dateNow = Date.now();
            let totalRemain = this.endDateTimer - dateNow;    
            let remainSeconds = Math.floor(totalRemain / 1000);
            let remainMinutes = Math.floor(remainSeconds / 60);
            let remainHours = Math.floor(remainSeconds / 60 /60);
            let remainDays = Math.floor(remainHours / 24);
            let remainMonths = Math.floor(remainDays / 30.437 > 11.99? 12 : remainDays / 30.437);
            let remainYears = Math.floor(totalRemain /1000 / 60 / 60 / 24 / 365.25)
        
            let seconds = remainSeconds - remainMinutes * 60 ;
            let minutes = remainMinutes - remainHours * 60;
            let hours = remainHours - remainDays * 24;
            let days = remainDays - parseInt(remainMonths * 30.417) ;
            let months = remainMonths - parseInt(remainYears * 12);
        
            resultArray[this.timerI] = `It's timer # ${this.timerI}| years: ${remainYears}, month: ${months}, days:${days}, hours: ${hours}, minutes: ${minutes}, seconds:${seconds}`;

            if(totalRemain <= 0){
                clearInterval(this.timer)
                emitter.emit('stop', this.timerI)
            }
    }
}

endDateEnter.forEach(el =>{
    new Timer(el)
})

function showTimers(){
    console.clear()
    resultArray.forEach( timer =>{
         console.log(timer)
    }) 
}

setInterval(showTimers,1000)

emitter.on('stop', handler)

function handler(timer){
    resultArray[timer] = `timer${timer}  has been finished`
}