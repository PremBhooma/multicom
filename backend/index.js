const express = require("express")
const cors = require("cors")

const { productRouter } = require("./routes/product.route")
const { connection } = require("./config/db")

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

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Successfully Connected DB")
    } catch (err) {
        console.log("Error while Connecting DB")
        console.log(err)
    }
    console.log(`Server is running on port ${process.env.PORT}`)
})