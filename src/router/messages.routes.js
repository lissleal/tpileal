import Router from "express";
import messageModel from "../dao/models/message.model.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
    try {
        let messages = await messageModel.find();
        res.send({result: "success", payload: messages})
    }
    catch (error) {
        console.log("Cannot get messages with mongoose: ", error);
    }
})

export default messageRouter;