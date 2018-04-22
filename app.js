// load our app server using express somehow
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
app.use(morgan('combined'))
       
app.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'lbta_mysql'
})
const userId = req.params.id
const queryString = "SELECT * FROM users WHERE id = ?"
console.log(queryString)
connection.query(queryString, [userId], (err, rows, fields) => {
  if (err) {
    console.log("Failed to query for users : "+ err)
    res.sendStatus(500)
    res.end()
    return 
  }
  console.log("I Think we fetched users successfully.")

  const users = rows.map((row) => {
    return { firstName: row.first_name, lastName: row.last_name }
  })


  res.json(users)
})
  //res.end()
})

app.get("/", (req, res) => {
    console.log("Responding to route")
    res.send("Hello from rooot")
})

app.get("/users", (req, res) => {
  var user1 = { firstName: "Stephen", lastName: "Curry" }
  const user2 = { firstName: "Kevin", lastName: "Durant" }
  res.json([user1, user2])
  res.send("Nodemon auto when i save this file")
})

// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003 ...")
})
