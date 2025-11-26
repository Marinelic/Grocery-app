import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://comida-e8cae-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const foodInDB = ref(database, "food")

const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")


addButton.addEventListener("click", function() {
    let inputValue = inputField.value
    push(foodInDB, inputValue)
    console.log(inputValue)
})