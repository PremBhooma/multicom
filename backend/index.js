const express = require("express")
const cors = require("cors")
const { productRouter } = require("./routes/product.route")

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})