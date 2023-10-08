import express from "express";
import { engine } from "express-handlebars";
import * as path from "path"
import __dirname from "./utils.js";

//Filesystem
import ProductFsRouter from "./router/productsfs.routes.js";
import CartFsRouter from "./router/cartsfs.routes.js";

//Mongoose
import mongoose from "mongoose";
import cartsRouter from "./router/carts.routes.js";
import productsRouter from "./router/products.routes.js";
import messagesRouter from "./router/messages.routes.js";
import uploadRouter from "./router/upload.routes.js";

//Usados para filesystem
import ProductManager from "./controlers/ProductManager.js";
const product = new ProductManager()

//Creación de la aplicación Express y servidor HTTP:
const app = express()
const PORT = 8080;
app.listen(PORT, () => console.log(`Escuchando servidor en puerto ${PORT}`))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Estructura handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))


//Configuración de rutas estáticas y de vistas:
app.use("/", express.static(__dirname + "/public"))
mongoose.set('strictQuery', true);


//Conexión a MongoDB:
mongoose.connect("mongodb+srv://lissett777:7b9DvuamjK0qhB8l@pruebacoder.uzvytlv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", (error) => {
    if (error) {
        console.log("Error connecting to database: ", error);
        process.exit();
    }
    console.log("Connected to database");
})


//Rutas para CRUD:
app.use("/api/carts", cartsRouter)
app.use("/api/products", productsRouter)
app.use("/api/messages", messagesRouter)

//Rutas para multer
app.use("/", uploadRouter)

//Rutas para filesystem
app.use("/api/productsfs", ProductFsRouter)
app.use("/api/cartsfs", CartFsRouter)

//Chat
app.get("/chat", (req, res)=> {
    res.render("chat", {
        title: "Chat con Mogoose"
    })
})






