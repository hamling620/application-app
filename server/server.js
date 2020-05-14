const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

app.listen(3001, err => {
    if (!err) {
        console.log('server running at http://localhost:3001')
    }
})