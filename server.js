const express = require('express')
const cors = require("cors");
require("dotenv").config();

const app = express()
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World!'));


app.get('/api/users', getAllUsers);

const users = [
    {id:1, name:'Admin', email:'admin@gmail.com', password:'admin', role:'ADMIN'},
    {id:2, name:'Renga', email:'r@gmail.com', password:'user', role:'USER'},
  ];

function getAllUsers(req,res){
  res.json(users);  
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))