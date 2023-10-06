import express from "express";
import { Server } from "socket.io";
//Filesystem
import ProductFsRouter from "./router/productsfs.routes.js";
import CartFsRouter from "./router/cartsfs.routes.js";
//Mongoose
import cartsRouter from "./router/carts.routes.js";
import productRouter from "./router/products.routes.js";
import messageRouter from "./router/messages.routes.js";
import mongoose from "mongoose";

import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controlers/ProductManager.js";
import ViewsRouter from "./router/views.routes.js";

//Creación de la aplicación Express y servidor HTTP:
const app = express()
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Escuchando servidor en puerto ${PORT}`))
const socketServer = new Server(httpServer)

const product = new ProductManager()

app.use("/", ViewsRouter)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Estructura handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Configuración de rutas estáticas y de vistas:
app.use("/", express.static(__dirname + "/public"))

//Configuración de eventos WebSocket:

socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado")

     socket.on('addProduct', async (productData) => { 
        console.log(productData);
        const prodAddByClient = await product.addProducts(productData)
        if(prodAddByClient === "Producto Agregado"){
        socketServer.emit("productAdded", productData)
        }    
    });
})

//Conexión a MongoDB:
mongoose.connect("mongodb+srv://lissett777:7b9DvuamjK0qhB8l@pruebacoder.uzvytlv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", (error) => {
    if (error) {
        console.log("Error connecting to database: ", error);
        process.exit();
    }
    console.log("Connected to database");
})



//Rutas para API de productos y carritos:
app.use("/api/carts", cartsRouter)
app.use("/api/products", productRouter)
app.use("/api/messages", messageRouter)
app.use("/api/products", ProductFsRouter)
app.use("/api/carts", CartFsRouter)


