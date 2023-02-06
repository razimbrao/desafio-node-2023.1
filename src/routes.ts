import { Router } from "express";
import { orderController } from "./controllers/orderController";
import { productController } from "./controllers/productController";
import { restaurantController } from "./controllers/restaurantController";
import { loginController } from "./controllers/loginController";
import { authVerify } from "./middlewares/authVerify";

const router = Router();
const orderCtrl = new orderController();
const productCtrl = new productController();
const restaurantCtrl = new restaurantController();
const loginCtrl = new loginController();

//Login
router.post("/login", loginCtrl.login);

//Restaurant
router.get("/restaurant", restaurantCtrl.list);
router.get("/restaurant/:id", restaurantCtrl.view);
router.post("/restaurant", authVerify, restaurantCtrl.create);
router.put("/restaurant/:id", authVerify, restaurantCtrl.update);
router.delete("/restaurant/:id", authVerify, restaurantCtrl.delete);

//Product
router.get("/product", productCtrl.list);
router.get("/product/:id", productCtrl.view);
router.post("/product", authVerify, productCtrl.create);
router.put("/product/:id", authVerify, productCtrl.update);
router.delete("/product/:id", authVerify, productCtrl.delete);

//Order
router.get("/order",  authVerify, orderCtrl.list);
router.get("/order/:id", authVerify, orderCtrl.view);
router.post("/order", authVerify, orderCtrl.create);
router.put("/order/:id", authVerify, orderCtrl.update);
router.delete("/order/:id", authVerify, orderCtrl.delete);

export { router };