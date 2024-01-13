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
let ownerNameEl = document.getElementById('owner-name')
let priceEl = document.getElementById('price')
let contactEl = document.getElementById('contact')
let megsListEl = document.getElementById('megs-list')

imageField.onchange = () => {
    profilepic.src = URL.createObjectURL(imageField.files[0])
}


buttonEl.addEventListener('click', () => {
    let inputValue = textfieldEl.value
    
    push(dataInDB, inputValue)
    
    console.log(`${inputValue} added to database`)
     megsListEl.innerHTML += `<div class="megs">
                                <img src="" id="pic" class="meg-img"/>
                                <div class="meg-inputs">
                                    <p>${inputValue}</p>
                                    <div class="sub-meg-inputs">
                                        <h2>${priceEl.value}</h2>
                                        <div class="sub-final-meg-inputs">
                                            <h2>${ownerNameEl.value}</h2>
                                            <h3>${contactEl.value}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
    inputValue = ""
    priceEl.value = ""
    ownerNameEl.value = ""
    contactEl.value = ""
})  

