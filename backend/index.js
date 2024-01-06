const express = require("express")
const cors = require("cors")

const { productRouter } = require("./routes/product.route")
const { connection } = require("./config/db")
const errorMiddleware = require("./middlewares/error")


//NOTE: Uncaught Exception should be write top 
// Error Type - Handing Uncaught Exception 

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send({ msg: "Home Route" })
})

app.use("/api/v1", productRouter)

app.use(errorMiddleware)

const server = app.listen(process.env.PORT, async () => {
    // try {
    await connection
    console.log("Successfully Connected DB")
    // } catch (err) {
    //     console.log("Error while Connecting DB")
    //     console.log(err)
    // }
    console.log(`Server is running on port ${process.env.PORT}`)
})



//NOTE: If you want to unhandle the rejectiosn of promises You should remove catch in connection DB so the Server will Show the Message According to our wish

// Error Type - unhandle promise rejection 

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejections`)

    server.close(() => {
        process.exit(1)
    })
})