const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authNotification')
const orderRoute = require('./routes/orderNotification')
const dbConnect = require('./connectDb')

dotenv.config()
const port = process.env.PORT || 3000
const app = express()
// conn db



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
