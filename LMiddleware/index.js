const express = require('express')
const app = express()
const morgan = require('morgan')


// middleware
// app.use(morgan('dev'))
app.use(morgan('common'))

// app.use(() => {
//     console.log("heyyy")
// })

app.get('/', (req, res) => {
    res.send('Welcome Home!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})