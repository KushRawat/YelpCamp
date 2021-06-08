const express = require('express')
const app = express()
const morgan = require('morgan')

const AppError = require('./AppError')

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

const verifyPassword = ((req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        next()
    }
    throw new AppError('password required', 401)
    // res.send('SORRY YOU NEED A PASSWORD!!!')
    // res.status(401)
    // throw new Error('Password required')
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

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('Woof Woof!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send("MY SECRET IS: Sometimes i wear headphones in public so i don't have to talk tp them")
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an Admin', 403)
})

app.use((req, res) => {
    // res.send('NOT FOUND')
    res.status(404).send('NOT FOUND!')
})

// ERROR HANDLING
// app.use((err, req, res, next) => {
//     console.log("**********")
//     console.log("*****ERROR*****")
//     console.log("**********")
//     // res.status(500).send("OH BOY, WE GOT AN ERROR")
//     console.log(err)  
//     next(err)
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err //setting default value to handle errors with other status error(ref /error)
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})