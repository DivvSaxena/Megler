import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = { // created a object in which we are setting up the database reference URL
    databaseURL:"https://megler-560a9-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings) // acts as a connection
const database = getDatabase(app) // to push data in the database we know have to create a reference & What is a reference? It is any location inside the database so any database that we will push will be stored inside that reference!
const dataInDB = ref(database , "megs")
// ref takes two things => 1st Which database you're using 
// second argument will be What the reference is called?  

let textfieldEl = document.getElementById('textarea')
let buttonEl = document.getElementById('button')

let profilepic = document.getElementById('pic')
let imageField = document.getElementById('image')

imageField.onchange = () => {
    profilepic.src = URL.createObjectURL(imageField.files[0])
}

buttonEl.addEventListener('click', () => {
    let inputValue = textfieldEl.value
    
    push(dataInDB, inputValue)
    
    console.log(`${inputValue} added to database`)
})