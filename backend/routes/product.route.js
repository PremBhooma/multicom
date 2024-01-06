const { Router } = require("express")

const { productModel } = require('../models/productModel');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const productRouter = Router();

//Create Product API -- Admin

productRouter.post("/product/new", catchAsyncErrors(async (req, res, next) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}))

// Get All Products

productRouter.get("/products", catchAsyncErrors(async (req, res) => {
    const products = await productModel.find()
    res.status(201).json({
        success: true,
        products
    })
}))

// Get Single Product

productRouter.get("/product/:id", catchAsyncErrors(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    res.status(201).json({
        success: true,
        product
    })
}))

//Update Product API -- Admin

productRouter.put("/product/:id", catchAsyncErrors(async (req, res, next) => {


    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
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

}))


//Delete Product API -- Admin

productRouter.delete("/product/:id", catchAsyncErrors(async (req, res, next) => {


    let product = await productModel.findById(req.params.id)

    if (!product) {
        return next(new ErrorHander("Product not found", 404))
    }

    await productModel.findByIdAndDelete(product);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })

}))

module.exports = {
    productRouter
}