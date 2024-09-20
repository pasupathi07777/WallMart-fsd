const palindrome = (prm) => {

    // return prm === prm.split("").reverse().join("") ? "is palindrome" : "is not a palindrome"
    // for(i=0;i<=prm.length;i--)
    // {


    // }
    let a = prm.length
    let b = 0
    while (a > b) {
        if (prm[0] === prm[a - 1]) {
            return "is palindrome"



        }
        a--
        b++
        // if(prm[0]===prm[a-1]){
        //     return "is palindrome"
        // }else{
        //   "  is not a palindrome"
        // }

    }
    return "  is not a palindrome"
}

console.log(palindrome("malayalam"))

const nonRepeated = (prm) => {

    for(let key of prm){
        if(prm.indexOf(key)===prm.lastIndexOf(key)){
            return key
        }
    }

    return "no repeting letter"


}

console.log(nonRepeated("smalayyalam"))


const convertToRoman=(prm)=>{
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

    let result=''

    for(let a in romanValues){
        
        while(romanValues[a]<=prm){
            result+=a;
            prm-=romanValues[a]
        }

    
    }

    return result

}

console.log(convertToRoman(90))

const ff="A man, a plan, a canal: Panama"
const res = ff.split('')
              .filter(e => e !== ',' && e !== ':' && e !== ' ') // Remove commas, colons, and spaces
              .reverse() // Reverse the array
              .join(''); // Join the array back into a string

console.log(res);
// const dd=ff.replace(/[:,]/g,"")
// dd.join("")
// console.log(res)