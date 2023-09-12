// Importing Express:
const express = require('express')
// Creating our server by calling Express:
const app = express()
// Port has to be above 1024
const port = 3000

const cors = require('cors');
const fruits = require('./fruits.json');

//MIDDLEWARE - CODE EXECUTED BETWEEN THE REQUEST AND RESPONSE
// AUTHENTIFICATION MIDDLEWARE
app.use(cors());
app.use(express.json()); //allows this middleware to be applied everywhere. 


// Create route - GET route: 
// [server].[method]('<path>', callback)
// req = request; res = response.
app.get('/', (req, res) => {
    res.send('Hello, Fruity!')
})

// route to return all the fruits
app.get('/fruits', (req, res) => {
    res.send(fruits)
})

//route to return specific fruit
// :<property> -> dynamic parameter
app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        //send error
        res.status(404).send("The fruit does not exist.");
    } else {
        res.send(fruit);
    }

    console.log(req.params.name);
    res.send('Return a specific fruit with name ${req.params.name}')
})

// ADD A NEW PIECE OF FRUIT TO THE DATA
app.post('/fruits', (req, res) => {
    const check = req.body
    const found = fruits.find(fruit => fruit.name.toLowerCase() == check.name.toLowerCase());  

   // express.json()

   const ids = fruits.map(fruit => fruit.id);
let maxId = Math.max(...ids); //copy of array is created here
req.body.id=maxId+1;

    if (found == undefined) {
        fruits.push(check)
        res.status(201).send(check)
       
    } else {
        // fruitBod = check[0].toUpperCase() + check.slice(1).toLowerCase()
        // // Added item is in the same format as the rest of the array, i.e. Uppercase, followed by lowercase letters
        // res.send("Added.")
        // console.log(fruitBod)
        res.status(409).send("This fruit already exists");
    }
console.log(req.body) // The body contains the data to create the piece of fruit
//res.send("New fruit created!")
})

// let highest_id = fruits[0].id
//     for (i = 1; i < fruits.length; i++){
//         if (fruits[i].id > highest_id){
//             highest_id = fruits[i].id
//         }
//     }

    // shown on the board:







// Bind the server to a port
// app.listen(<port>, () => {})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// localhost:3000 (localhost = the IP address)
//module.exports = app;