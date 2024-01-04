const { Router } = require("express")

const productRouter = Router();

productRouter.get("/products", (req, res) => {
    res.send("Products Router Successfull")
})

module.exports = {
    productRouter
}