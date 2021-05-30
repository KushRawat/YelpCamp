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
// Will work irrespective of being a get req or post req
app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
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

app.use((req, res) => {
    // res.send('NOT FOUND')
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})