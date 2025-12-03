import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://comida-e8cae-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

let deviceId = localStorage.getItem("deviceId")

    if (!deviceId) {
        deviceId = crypto.randomUUID()
        localStorage.setItem("deviceId", deviceId)
    }


const foodInDB = ref(database, `food/${deviceId}`)

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


    addButton.addEventListener("click", function() {
        let inputValue = inputField.value
        push(foodInDB, inputValue)

        clearInputField()
    })


    onValue(foodInDB, function(snapshot) {

            if (snapshot.exists()) {
                let foodArray = Object.entries(snapshot.val())

            clearShoppingListEl()
            
            for ( let i = 0; i < foodArray.length; i++ ) {
                let currentFood = foodArray[i]
                let currentItemID = currentFood[0]
                let currentItemValue = currentFood[1]
                
                addShoppingList(currentFood)
            }
        } else {
            shoppingListEl.innerHTML = "No items here"
        }
        
    })

    function clearShoppingListEl() {
        shoppingListEl.innerHTML = ""
    }

    function clearInputField(){
        inputField.value = ""
    }
        
    function addShoppingList(item) {
        let itemID = item[0]
        let itemValue = item[1]
        let newEl = document.createElement("li")

        newEl.textContent = itemValue

        newEl.addEventListener("click", function() {
            let locationInDB = ref(database, `food/${deviceId}/${itemID}`)
            remove(locationInDB)
        })

            shoppingListEl.append(newEl)
    }