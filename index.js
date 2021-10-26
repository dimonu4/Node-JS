const colors = require("colors/safe");
let primeNumbArray = [];
let colorsArr= [colors.green, colors.yellow, colors.red];
let [from , to] = process.argv.slice(2);
from = parseInt(from)
to = parseInt(to);

if(to < from){
    console.log(colors.grey("The number A must be grater then B"))
}

if(isNaN(from)|| isNaN(to)){   
    throw new Error('The numbers must be the type of number') 
}

function primeNumbers(_from , _to){
     for(let i = _from ; i <= _to; i++){
         if(i <= 1) {
         continue
         } else if (i==2){
             primeNumbArray.push(i)
         } else {
            for(let j=2; j<=i; j++){
                if(i % j === 0 && i!=j){
                    break
                }else if(i % j === 0 && i === j){
                    primeNumbArray.push(i)
                }
                else{
                    continue
                }
                
            }
         }
     }
}

primeNumbers(from, to)

if(primeNumbArray.length <= 0){
    console.log(colors.red("There are no prime numbers in the range"))
}

function coloredArray(array){
    let i=0;
    array.forEach(number=>{
        if(i===3){i=0}
        console.log(colorsArr[i](number))
        i++
    })
}

coloredArray(primeNumbArray)

