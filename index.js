console.log("palidrom")

const pali=(pra)=>{
   return pra===pra.split('').reverse().join("")?"it is palidrom":"is not a palidrom"

}

const result=pali("malayalam")
// console.log(result)


const rep=(prm)=>{
   for(let val of prm){
    if(prm.indexOf(val)===prm.lastIndexOf(val)){
        return val
    }


   }
   return "no repeting char"

}

const result2=rep("aabbffee")
console.log(result2)





function integerToRoman(num) {
    const romanValues = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let roman = '';
   for (let a in romanValues){
    while(num>=romanValues[a]){
        roman+=a
        num-=romanValues[a]


    }
   }

   return roman
}

// Driver code
console.log(integerToRoman(100));
// console.log(integerToRoman(1994));

