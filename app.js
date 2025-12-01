import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://comida-e8cae-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const foodInDB = ref(database, "food")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


    addButton.addEventListener("click", function() {
        let inputValue = inputField.value
        push(foodInDB, inputValue)

        clearInputField()
    })


    onValue(foodInDB, function(snapshot) {
        let foodArray = Object.values(snapshot.val())

        clearShoppingListEl()
        
        for ( let i = 0; i < foodArray.length; i++ ) {
            let currentFood = foodArray[i]
            
            addShoppingList(currentFood)
        }
    })

    function clearShoppingListEl() {
        shoppingListEl.innerHTML = ""
    }

    function clearInputField(){
        inputField.value = ""
    }
        
    function addShoppingList(itemValue) {
        shoppingListEl.innerHTML += ` <li> ${itemValue} </li> `
    }