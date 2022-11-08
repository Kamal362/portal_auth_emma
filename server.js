require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const port = process.env.PORT || 3031
const UserModel = require('./database/schema')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(morgan('dev'))

const USERS = []
const SALT = 5
 
// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


// connecting to db
mongoose.connect(process.env.DB_URL)
//mongoose.connect(db_url)
.then(app.listen(port, () => console.log(`app listening to port ${port}...`)))
.then((result) => console.log("database successfully connected...."))
.catch((err) => console.log('not able to connect to the database '+ err))


// routes
app.get('/', (req, res) => {
    res.render('register')
})

app.get('/mainpage', (req, res) => {
    res.render('mainpage')
})

app.get('/login', (req, res) => {
    res.render('login')
})

// posting and accepting inputs
app.post('/', (req, res) => {

    // storing it in an array
    // USERS.push({
    //     studentID: req.body.studentId,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     otherName: req.body.otherName,
    //     programme: req.body.programme,
    //     hall: req.body.hall,
    //     sex: req.body.sex,
    //     contact: req.body.contact,
    //     email: req.body.email,
    //     // password: req.body.password
    //     password: bcrypt.hashSync(req.body.password, SALT)

    // })

    // console.log(USERS)
    
    // detabase
    const user = new UserModel({
        studentID: req.body.studentId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherName: req.body.otherName,
        programme: req.body.programme,
        hall: req.body.hall,
        sex: req.body.sex,
        contact: req.body.contact,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, SALT)
    })

    user.save()
    .then((result)=> res.send(`user added to the database sucessfully.`))
    .catch((err)=> console.log('err occured: ' + err))
    
    res.redirect('login')
})


// login details 
app.post('/login', (req, res) =>{
    const user = USERS.find(user => user.studentID)

    if(user){

        // if ( user.studentID === req.body.studentID && user.password === req.body.password ){
        //     res.redirect('mainpage')
        // }else{
        //     res.send("userID and password mismatch")
        // }

        res.redirect('mainpage')

    }else{
       res.send('User does not exist! <a href= "/"> Register </a> ')
    }
   console.log(USERS)
})

