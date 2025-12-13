// let id: number | string | boolean = 123;
// id = "hola mundo";
// id = true

// //tipo de dato reservado

// type myid = number | string

// let thing: myid = "jaja"
// thing = 123;

// //tipo de datos par objeto
// type movie = {
//     title: string;
//     duration: number;
//     hasOscars: boolean;
// }

// const esdla: movie = {
//     title: "El Señor de los Anillos",
//     duration: 200,
//     hasOscars: true
// }

// //arrays
// let myArr: (number | string | boolean)[] = [1,2,3]
// myArr = ["", 1, true]

// //tipo de dato literal
// type stateLoading = "loading";
// type stateError = "error"

// let state: stateLoading;
// let error: stateError;

// type state = stateLoading | stateError;

// let states: state = "loading"

// //intersección
// type book = {
//     title: string;
//     pages: number;
// }

// type bookAdaptation = movie & book;

// const harryPotter: bookAdaptation = {
//     title: "harri potter",
//     duration: 120,
//     hasOscars: true,
//     pages: 400
// }


// console.log(harryPotter)

// function sum(n1: number, n2: number){
//     return n1 + n2
// }

// let result = sum(1, 3)
// console.log(result)

// const toUpper = (str:string)=> str.toLocaleUpperCase()
// console.log(toUpper("hola"))

// function sayHello(){
//     console.log("Hello")
// }

// sayHello()

// console.log("jaja")

// type user = {
//     user: string,
//     email: string,
//     phone: number,
//     password: string
// }

// const users: user = {
//     user: "Juan Hernández",
//     email: "juliahernandez.pp1@gmail.com",
//     phone: 59299929,
//     password: "julia.pp1"
// }

// const h1 = document.querySelector("title")
// console.log(h1?.textContent);


// const username = document.getElementById("username") as HTMLInputElement
// console.log(username.placeholder)

function getFirst<some>(arr: some[]){
    return arr[0];
}

const arrays = [1,2,3,4]
const arraysString = ["hola", "mundo"]

console.log(getFirst<number >(arrays))
console.log(getFirst<string>(arraysString))

type envData = {
    security: {
        refresh: {
            refreshToken: string;
            refreshExpires: string
        },
        access:{
            accessToken: string;
            accessExpires: string
        }
    }
}

export const env: envData = {
    security:{
        refresh:{
            refreshToken: "hola mundo",
            refreshExpires: "15m"
        },
        access:{
            accessToken: "hola mundo 2",
            accessExpires: "15m"
        }
    }
}