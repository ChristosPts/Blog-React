const express = require('express')
const app = express()
const cors = require('cors')
 
const PORT =  5000

app.use(cors())
app.use(express.json())

app.post('/register', (req,res) => {
    const {username, password} = req.body
    res.json({requestData:{username,password}})
})


 
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})