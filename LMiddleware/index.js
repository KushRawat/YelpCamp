const express = require('express')
const app = express()
const morgan = require('morgan')


// middleware
// app.use(morgan('dev'))
app.use(morgan('dev'))

// app.use(() => {
//     console.log("heyyy")
// })

app.use((req, res, next) => {
    console.log("THIS IS MY FIRST MIDDLEWARE")
    return next()
    console.log("THIS IS MY FIRST MIDDLEWARE after calling next")

})
app.use((req, res, next) => {
    console.log("THIS IS MY second MIDDLEWARE")
    next()
})

app.get('/', (req, res) => {
    res.send('Welcome Home!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})