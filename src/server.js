import express from 'express'
const app = express()

const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('Server Good to Go')
})

app.listen(port, () => {
    console.log("Server is runnning at port" + port)
})
