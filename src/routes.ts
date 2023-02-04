import { Router } from "express";
import { orderController } from "./controllers/orderController";
import { productController } from "./controllers/productController";
import { restaurantController } from "./controllers/restaurantController";

const router = Router();

router.get("/restaurant", new restaurantController().list());
router.post("/restaurant", new restaurantController().create());
router.get("/restaurant/:id", new restaurantController().view());
router.put("/restaurant/:id", new restaurantController().update());
router.delete("/restaurant/:id", new restaurantController().delete());

router.get("/product", new productController().list());
router.post("/product", new productController().create());
router.get("/product/:id", new productController().view());
router.put("/product/:id", new productController().update());
router.delete("/product/:id", new productController().delete());

router.get("/order", new orderController().list());
router.post("/order", new orderController().create());
router.get("/order/:id", new orderController().view());
router.put("/order/:id", new orderController().update());
router.delete("/order/:id", new orderController().delete());

export { router };