import Router from "express";
import { uploader } from "../controlers/multer.js";

const uploadRouter = Router();

let products = [];

uploadRouter.get("/", (req, res) => {
    res.send({result: "success", payload: products})
})

uploadRouter.post("/upload", uploader.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ status: "error", error: "No file uploaded"})
    }
    let prod = req.body
    prod.profile = req.file.path
    products.push(prod)
    res.send({ status: "success", message: "Image saved"}) 
})

export default uploadRouter;