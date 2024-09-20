// // // console.log("palidrom")

// // // const pali=(pra)=>{
// // //    return pra===pra.split('').reverse().join("")?"it is palidrom":"is not a palidrom"

// // // }

// // // const result=pali("malayalam")
// // // // console.log(result)


// // // const rep=(prm)=>{
// // //    for(let val of prm){
// // //     if(prm.indexOf(val)===prm.lastIndexOf(val)){
// // //         return val
// // //     }


// // //    }
// // //    return "no repeting char"

// // // }

// // // const result2=rep("aabbffee")
// // // console.log(result2)





// // // function integerToRoman(num) {
// // //     const romanValues = {
// // //         M: 1000,
// // //         CM: 900,
// // //         D: 500,
// // //         CD: 400,
// // //         C: 100,
// // //         XC: 90,
// // //         L: 50,
// // //         XL: 40,
// // //         X: 10,
// // //         IX: 9,
// // //         V: 5,
// // //         IV: 4,
// // //         I: 1
// // //     };
// // //     let roman = '';
// // //    for (let a in romanValues){
// // //     while(num>=romanValues[a]){
// // //         roman+=a
// // //         num-=romanValues[a]


// // //     }
// // //    }

// // //    return roman
// // // }

// // // // Driver code
// // // console.log(integerToRoman(100));
// // // // console.log(integerToRoman(1994));

// // // palidrom 

// // const palindrome = (prm) => {

// //     return prm === prm.split("").reverse().join("") ? "is palindrome" : "is not a palindrome"

// // }

// // // console.log(palindrome("malayalam"))

// // // the first Non-Repeated Character
// // const nonRepeated = (prm) => {

// //     for (let key of prm) {
// //         if (prm.indexOf(key) === prm.lastIndexOf(key)) {
// //             return key
// //         }
// //     }

// //     return "all char are repeting"


// // }

// // console.log(nonRepeated("malayalam"))




// // // Integer to Roman Numerals


// // const intToRoman = (prm) => {
// //     const romanValues = {
// //         M: 1000,
// //         CM: 900,
// //         D: 500,
// //         CD: 400,
// //         C: 100,
// //         XC: 90,
// //         L: 50,
// //         XL: 40,
// //         X: 10,
// //         IX: 9,
// //         V: 5,
// //         IV: 4,
// //         I: 1
// //     };

// //     let roman = ""

// //     for (let key in romanValues) {

// //         while (romanValues[key] <= prm) {
// //             roman += key
// //             prm -= romanValues[key]

// //         }

// //     }

// //     return roman
// // }


// // console.log(intToRoman(390))
// // console.log(5 / 10)

// function demo() {
//   a={  b: 10}

//     console.log(this.a.b)
// }
// demo()

// console.log(a)


// const person = {
//     name: 'Pasupathi',
//     greet: function() {
//         console.log(this);
//     }
// };
// console.log('5' + 1);
// console.log("5" + 1);
// console.log(5 + "1");
// person.greet(); // Output: Pasupathi



// let arr=[1,2,3,4,5]


// let add=()=>{
//     let resutl=0
   

//     for(let i=0;i<arr.length;i++){
//         resutl+=arr[i]

//     }

//     return resutl
// }


let arr = [1, 2, 3, 4, 5];

let add = () => {
  let result = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return result;
}

let res = add();
console.log(res);




