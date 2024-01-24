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

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/v1/verify", authRoute)

app.listen(port, () => {
    dbConnect()
    console.log(`Notification service running on port: ${port}`)
})

