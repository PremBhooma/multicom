const { Router } = require("express")

const { productModel } = require('../models/productModel')

const productRouter = Router();

//Create Product API -- Admin

productRouter.post("/product/new", async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

// Get All Products

productRouter.get("/products", async (req, res) => {
    const products = await productModel.find()
    res.status(201).json({
        success: true,
        products
    })
})

// Get Single Product

productRouter.get("/product/:id", async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            mes: "Product not found"
        })
    }

    res.status(201).json({
        success: true,
        product
    })
})

//Update Product API -- Admin

productRouter.put("/product/:id", async (req, res, next) => {

    try {
        let product = await productModel.findById(req.params.id)

        if (!product) {
            return res.status(500).json({
                success: false,
                mes: "Product not found"
            })
        }

        product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ mes: "Update Failed" })
    }
})


//Delete Product API -- Admin

productRouter.delete("/product/:id", async (req, res, next) => {

    try {
        let product = await productModel.findById(req.params.id)

        if (!product) {
            return res.status(500).json({
                success: false,
                mes: "Product not found"
            })
        }

        await productModel.findByIdAndDelete(product);

        res.status(200).json({
            success: true,
            mes: "Product Deleted Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ mes: "Delete Failed" })
    }
})

module.exports = {
    productRouter
}