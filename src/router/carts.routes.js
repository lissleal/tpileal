import Router from "express";
import cartModel from "../dao/models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        let carts = await cartModel.find();
        res.send({result: "success", payload: carts})
    }
    catch (error) {
        console.log("Cannot get carts with mongoose: ", error);
    }
})

router.post("/", async (req, res) => {
    let {name, description, products} = req.body;

    if (!name || !description || !products) {
        return res.send({status: "error", error: "Incomplete values"})
    }
    let result = await cartModel.create({
        name, 
        description, 
        products
    })
    res.send({result: "success", payload: result})
})

router.put("/:cid", async (req, res) => {
    let {cid} = req.params;
    let cartToReplace = req.body;
    if (!cartToReplace.name || !cartToReplace.description || !cartToReplace.products){
        return res.send({status: "error", error: "Incomplete values"})
    }
    let result = await cartModel.updateOne({_id: cid}, cartToReplace);
    res.send({result: "success", payload: result})
})

router.delete("/:cid", async (req, res) => {
    let {cid} = req.params;
    let result = await cartModel.deleteOne({_id: cid});
    res.send({result: "success", payload: result})
})

export default router;