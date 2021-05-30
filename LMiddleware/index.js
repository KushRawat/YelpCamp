const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('dev'))
app.use((req, res, next) => {
    req.requestTime = Date.now()
    // req.method = 'GET'
    console.log(req.method.toLowerCase(), req.path)
    next()
})

// middleware
// app.use(morgan('dev'))

// app.use(() => {
//     console.log("heyyy")
// })

// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE")
//     return next()
//     console.log("THIS IS MY FIRST MIDDLEWARE after calling next")

// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY second MIDDLEWARE")
//     next()
// })

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Welcome Home!')
})
app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Woof Woof!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})