import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
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

// let profilepic = document.getElementById('pic')
let imageField = document.getElementById('image')
let ownerNameEl = document.getElementById('owner-name')
let priceEl = document.getElementById('price')
let contactEl = document.getElementById('contact')
let megsListEl = document.getElementById('megs-list')

let megItems = []




buttonEl.addEventListener('click', () => {
    let inputValue = textfieldEl.value
    
    //push(dataInDB, inputValue)

    if(inputValue && ownerNameEl.value && priceEl.value && contactEl.value && imageField.value){
    megItems.unshift({
        description:`${textfieldEl.value}`,
        owner:`${ownerNameEl.value}`,
        price:`${priceEl.value}`,
        contact:`${contactEl.value}`,
        image: `${URL.createObjectURL(imageField.files[0])}`,
        id:uuidv4()
    })
    
    console.log(megItems)
    console.log(`${inputValue} added to database`)

    render()

    textfieldEl.value = ''
    priceEl.value = ""
    ownerNameEl.value = ""
    contactEl.value = ""
}
})  

function getFeedHtml(){
    let feedHtml = ``
    megItems.forEach(function(item){
         feedHtml += `<div class="megs">
                                <img src="${item.image}" id="${item.id}" class="meg-img"/>
                                <div class="meg-inputs">
                                    <p>${item.description}</p>
                                    <div class="sub-meg-inputs">
                                        <h2>${item.price}</h2>
                                        <div class="sub-final-meg-inputs">
                                            <h2>${item.owner}</h2>
                                            <h3>${item.contact}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
    })

    return feedHtml
}

function render(){
    megsListEl.innerHTML = getFeedHtml()
}