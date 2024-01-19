import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref as reference, push , onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getStorage, ref , uploadBytes, getDownloadURL   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"


const firebaseConfig = { // created a object in which we are setting up the database reference URL
    apiKey: "AIzaSyA48p8yM99nqHfvh50gzgRrR8zLjkcqzXI",
    authDomain: "megler-560a9.firebaseapp.com",
    databaseURL: "https://megler-560a9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "megler-560a9",
    storageBucket: "megler-560a9.appspot.com",
    messagingSenderId: "828929505719",
    appId: "1:828929505719:web:713398110458f9cd1e9032"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage()
const storageRef = ref(storage)

const imagesRef = ref(storage, 'images')


// const app = initializeApp(appSettings) // acts as a connection
const database = getDatabase(app) // to push data in the database we know have to create a reference & What is a reference? It is any location inside the database so any database that we will push will be stored inside that reference!
const dataInDB = reference(database , "megs")
// ref takes two things => 1st Which database you're using 
// second argument will be What the reference is called?

// 'file' comes from the Blob or File API
    
  

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



buttonEl.addEventListener('click', async (e) => {
    let inputValue = textfieldEl.value

    let firebaseimgurl
    //push(dataInDB, inputValue)
    if(inputValue && ownerNameEl.value && priceEl.value && contactEl.value && imageField.value){
        let sparkyRef = ref(storage, `images/${inputValue}`)
     try{    
            const snapshot = await uploadBytes(sparkyRef, imageField.files[0])

            const url = await getDownloadURL(sparkyRef)

            const item = {
                description:`${textfieldEl.value}`,
                owner:`${ownerNameEl.value}`,
                price:`${priceEl.value}`,
                contact:`${contactEl.value}`,
                image: `${url}`,
                id:uuidv4()
            }

            
            push(dataInDB, item)

            megItems.unshift(item)
        
    
        // console.log(megItems)
        // console.log(`${inputValue} added to database`)

        
        clearFeed()
    }

    catch (error){
        console.error('Error uploading file to Firebase:', error);
            // Handle the error as needed

    }
        
    }
})  


onValue(dataInDB, (snapshot) => {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val())
        let feedHtml = ''

        for (let i = itemArray.length - 1; i >= 0; i--) {
            let currentItem = itemArray[i][1]; // Access the item from the array
            feedHtml += getFeedHtml(currentItem);
        }

        render(feedHtml); // Call render with the accumulated HTML
    }
})




function getFeedHtml(item) {
    return `<div class="megs">
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
            </div>`;
}

function render(feedHtml){
    megsListEl.innerHTML = feedHtml
}

function clearFeed(){
    textfieldEl.value = ''
    priceEl.value = ""
    ownerNameEl.value = ""
    contactEl.value = ""
}