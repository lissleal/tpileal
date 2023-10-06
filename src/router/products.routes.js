import Router from "express";
import productModel from "../dao/models/product.model.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    try {
        let products = await productModel.find();
        res.send({result: "success", payload: products})
    }
    catch (error) {
        console.log("Cannot get products with mongoose: ", error);
    }
})

export default productRouter;