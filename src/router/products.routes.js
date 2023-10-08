import Router from "express";
import productModel from "../dao/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        let products = await productModel.find();
        res.send({result: "success", payload: products})
    }
    catch (error) {
        console.log("Cannot get products with mongoose: ", error);
    }
})
router.post("/", async (req, res) => {
    let {
    name, description, price, category, stock, thumbnail} = req.body;

    if (!name || !description || !price || !category || !stock || !thumbnail) {
        return res.send({status: "error", error: "Incomplete values"})
    }
    let result = await productModel.create({
        name, 
        description,
        price, 
        category,
        stock,
        thumbnail
    })
    res.send({result: "success", payload: result})
})

router.put("/:pid", async (req, res) => {
    let {pid} = req.params;
    let productToReplace = req.body;
    if (!productToReplace.name || !productToReplace.description || !productToReplace.price || !productToReplace.category || !productToReplace.stock || !productToReplace.thumbnail){
        return res.send({status: "error", error: "Incomplete values"})
    }
    let result = await productModelModel.updateOne({_id:pid}, productToReplace);
    res.send({result: "success", payload: result})
})

router.delete("/:pid", async (req, res) => {
    let {pid} = req.params;
    let result = await productModel.deleteOne({_id: pid});
    res.send({result: "success", payload: result})
})
export default router;