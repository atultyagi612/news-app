# news-app

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qb5p4ycqfxm7m4doq2io.jpg)

Today we are going to develop a simple News app with the help of NodeJS , Express , EJS and bootstrap.

There are going to be 2 main features in this website search and display news articles And we are going to use Newapi for getting news articles. 

## Lets Start

### Initialize the New Project
To initialize the new project you just need to create a new folder _"News App"_  and open folder in visual studio code or any other IDE and run the below code in command line 
```javascript
 npm init  
```
This takes only few seconds and also asks few question about your project like project name , description etc. after that initialization is over and a file name _"Package.json"_ is generated .

### Structure of project 
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/21dvkpob7ijwuahcfbvr.jpg)

As with the reference of the above image create folders and files leave node_modules package-lock and package-json as they generate automatically .

### Install Dependencies
These are the Dependencies we need to install for our project.
```
express
ejs
body-parser
axios
math
moment
```
For installing these Dependencies you just need to write the below code in your terminal
```javascript
npm install express ejs body-parser axios math moment
```
### Setup App for run
To start the server automatically we just need to install Nodemon which restart server automatically when any change is detected
```javascript 
npm install -D nodemon
```
Setup application for developer run and normal run. Just change the Script section with the below code in `package.json`.
```
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
```

### Start developer local server
To start our app for testing/developer just simply type the following command in the command line:
```javascript
npm dev
```
### Application
Lets code our `app.js` file this is the main file and it will sit in the root of our website.
In this file we have to setup our server .

file:-> `app.js`
```javascript
const express = require('express')
const app=express()
const port = process.env.PORT||3000;
const bodyParser = require('body-parser');
const moment = require('moment')
app.locals.moment = moment;

// template engine  
app.use(express.static('public'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',require('./routes/news'))

app.set('views','./views')

app.listen(port,()=> console.log("started"))
```

### Routes 
Lets build a extremal routes 
External routing is a way of structuring your code so that it stays nice and organized by taking the route implementations outside of the main server file and moving them into a separate router file.

First you need your NewsApi API key for getting data , Go to [NewsApi](https://newsapi.org/) site and get your Api key then and simply replace `YOUR_API` in the url with your Api key in the below code
file:-> `routes/news.js`
```javascript
const express = require('express')
const axios = require('axios')
const newsr=express.Router()
const moment = require('moment')
const math = require('math')


newsr.get('/',async(req,res)=>{
    try {
        var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          'apiKey=2c6bfa81c2e8403da6eff5d85b8d1432';

        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
        
        
        
    
    } catch (error) {
        if(error.response){
            console.log(error)
        }
        
    }
})

newsr.post('/search',async(req,res)=>{
    const search=req.body.search
    // console.log(req.body.search)

    try {
        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=2c6bfa81c2e8403da6eff5d85b8d1432`

        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles})
        
        

        
        
    } catch (error) {
        if(error.response){
            console.log(error)
        }
        
    }
})


module.exports=newsr
```

### Views
file:-> `views/news.ejs`

```javascript
<!DOCTYPE html>
<html lang="en">
    

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital@1&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/css/style.css">
        <style>
            .form-control{
                border-color: red;
            }
        </style>
</head>

<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top fixed-top">
        <a class="navbar-brand" href="/" style="font-weight: 700;
        font-size: 24px;"> <span style="color: red;" >X</span>-news</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse searc-bar" id="navbarSupportedContent">
            
            <form class="form-inline my-2 my-lg-0" action="/search" method="POST">
                <input class="form-control mr-sm-2"  name="search" type="search" placeholder="Search" style="width: 522px;"
                    aria-label="Search">
                <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>




    
    <div class="news-container ">
        <div class="news ">

            <% articles.forEach(function(article,index){ %>

                <% if ((typeof article.url=='object') || (typeof article.title=='object') || (typeof article.urlToImage=='object') || (typeof article.content=='object')){ %>
                    <% } else{ %>
                        <a href="<%- article.url %>" target="_blank" class="news-box Hover-effect">

                            <img src="<%- article.urlToImage %>" alt="Image">
                            <h3>
                                <%- article.title %>
                            </h3>


                            <p>
                                <%- article.content %>
                            </p>
                            <br>
                            <p style="margin-bottom: 0px; position: absolute; right: 0; bottom: 0; font-family: ui-monospace;">Updated: <span style="color:red;" ><%- new Date(article.publishedAt.slice(0,10)).toDateString() %>    <%- moment.utc(article.publishedAt).local().format('hh : mm A') %> </span></p>


                        </a>
                        <% } %>
                        <% }) %>
        </div>
    </div>
    <script src="moment.js"></script>
<script src="moment-timezone-with-data.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>
```

### Style
```css
body{
    margin: 0;
    font-family: sans-serif;
    background-color: rgba(245, 238, 238, 0.89);
}
nav{
    margin-bottom: 40px;
}
img{
    max-width: 100%;
    transition: all 0.7s ;
}

.Hover-effect:hover{
    transform:  translateY(-3px) scale(1.01);
    
}
.Hover-effect:hover img{
    transform:  translateY(-5px) scale(1.02);
    box-shadow: 10px 9px 17px -10px rgba(0,0,0,0.28);
}
h3{
    font-size: 1.55rem;
}
h2{
    font-size: 1.55rem;
}
.news-container{
    margin-bottom: 69px;
    padding: 0 1rem;
    padding-top: 92px;
}
.news{
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(300px,1fr));
    grid-gap: 2rem;
    
}
.news-box{
    transition: all 0.3s ;
    text-decoration: none;
    color: rgb(29, 25, 25);

    background-color: white;
    padding: 20px;
}

.news-box:hover{
    text-decoration: none;
    color: rgb(29, 25, 25);;
    box-shadow: 0 3px 3px rgba(0,0,0,0.16), 0 3px 3px rgba(0,0,0,0.23);
}


.searc-bar{
    justify-content: center;
}

/* #effect ********************** */

.Hover-effect {
    position: relative;
}
:root{
    --underline_color: red;
    --underline-hight:0.175rem;
}
.Hover-effect::after {
    content: "";
    position: absolute;
    width: 100%;
    height: var(--underline-hight);
    background-color: var(--underline_color);
    left: 0;
    bottom: 0;
    transform: scale(0, 1);
    transition: transform 0.3s ease;
}



.Hover-effect:hover::after {
    transform: scale(1, 1);
}
```

#### Your App is complete 🎉🎉



#### [Preview](https://x-news-app.herokuapp.com/)







