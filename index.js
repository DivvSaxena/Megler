import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// // import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// import { getStorage, ref , uploadBytes, getDownloadURL   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"


// const appSettings = { // created a object in which we are setting up the database reference URL
//     apiKey: "AIzaSyA48p8yM99nqHfvh50gzgRrR8zLjkcqzXI",
//     authDomain: "megler-560a9.firebaseapp.com",
//     databaseURL: "https://megler-560a9-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "megler-560a9",
//     storageBucket: "megler-560a9.appspot.com",
//     messagingSenderId: "828929505719",
//     appId: "1:828929505719:web:713398110458f9cd1e9032"
// }

// const app = initializeApp(appSettings) // acts as a connection
// const database = getDatabase(app) // to push data in the database we know have to create a reference & What is a reference? It is any location inside the database so any database that we will push will be stored inside that reference!
// const dataInDB = ref(database , "megs")
// ref takes two things => 1st Which database you're using 
// second argument will be What the reference is called?


// const storage2InDB = ref(storage, "bobby")

let textfieldEl = document.getElementById('textarea')
let buttonEl = document.getElementById('button')

// let profilepic = document.getElementById('pic')
let imageField = document.getElementById('image')
let ownerNameEl = document.getElementById('owner-name')
let priceEl = document.getElementById('price')
let contactEl = document.getElementById('contact')
let megsListEl = document.getElementById('megs-list')

let megItems = []

// const storage = getStorage(app)
// const storageInDB = ref(storage,'images')


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

    // console.log(megItems)
    // console.log(`${inputValue} added to database`)

    render()
    clearFeed()
    
}
})  





function getFeedHtml(){
    let feedHtml = ``
    megItems.forEach(function(item){
         feedHtml += `<div class="megs">
                                <img src="${item.image}" id="madmax" class="meg-img"/>
                                <div class="meg-inputs">
                                    <p>${item.description}</p>
                                    <div class="sub-meg-inputs">
                                        <h2>$${item.price}</h2>
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

function clearFeed(){
    textfieldEl.value = ''
    priceEl.value = ""
    ownerNameEl.value = ""
    contactEl.value = ""
}