const express = require('express')
const bodyParser = require('body-parser')
const route  = require("./routes/route")
const {default:mongoose} = require('mongoose')
const multer = require("multer")

const app =express()
app.use(multer().any())
app.use(bodyParser.json())

const url = "mongodb+srv://Saif2:Pvvluxhd2m5OOHIg@cluster0.j5omh.mongodb.net/BookManagementdb"

mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("MongoDB Is Connected"))
.catch(err=>console.log(err.message))

app.use('/',route)




app.listen(process.env.PORT || 3000,function(){
    console.log("Express app is running on PORT "+(process.env.PORT||3000))
})