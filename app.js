const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))

const friends = ["Afzal","Imad","Shivam","Hassan"]

app.get("/", (req,res)=> {
    res.render("index.ejs", {friends:friends})
})

app.get("/update/:name", (req,res) => { 
    //find   
    const userFound = friends.find(function (friend) {
        return friend === req.params.name
    })
    res.render("update.ejs", {userFound: userFound})

})

app.put("/update/:name", (req,res) => {
    //Find friend using index
     const findFriendIndex = friends.findIndex( function (friend) {
        return friend === req.params.name
    })
    //Update friends array using updated value
    friends[findFriendIndex] = req.body.friend
    res.redirect("/")

})

app.post("/", (req,res) => {
   const newFriend = req.body.friend
   friends.push(newFriend)
   res.redirect("/")
})

app.listen(port, (req,res) => {
    console.log(`Listening at port ${port}`)
})