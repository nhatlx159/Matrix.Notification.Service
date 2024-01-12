const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authNotification')
const orderRoute = require('./routes/orderNotification')

dotenv.config()
const port = process.env.PORT || 3000
const app = express()
// conn db
const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("connect success!!");
    } catch (error) {
        throw error
    }
}


app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/", authRoute)
// app.use("/auth", authRoute)
// app.use("/order", orderRoute)

app.listen(port, () => {
    dbConnect()
    console.log(`Example app listening on port ${port}`)
})
