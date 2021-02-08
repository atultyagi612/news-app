const express = require('express')
const app=express()
const port = 3000;
const bodyParser = require('body-parser');


app.use(express.static('public'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',require('./routes/news'))

app.set('views','./views')

app.listen(port,()=> console.log("started"))