import { Router } from "express";
import { orderController } from "./controllers/orderController";
import { productController } from "./controllers/productController";
import { restaurantController } from "./controllers/restaurantController";
import { authenticateController } from "./controllers/authenticateController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

router.post("/login", new authenticateController().login());

router.get("/restaurant", new restaurantController().list());
router.get("/restaurant/:id", new restaurantController().view());
router.post("/restaurant", ensureAuthenticated, new restaurantController().create());
router.put("/restaurant/:id", ensureAuthenticated, new restaurantController().update());
router.delete("/restaurant/:id", ensureAuthenticated, new restaurantController().delete());

router.get("/product", new productController().list());
router.get("/product/:id", new productController().view());
router.post("/product", new productController().create());
router.put("/product/:id", ensureAuthenticated, new productController().update());
router.delete("/product/:id", ensureAuthenticated, new productController().delete());

router.get("/order", new orderController().list());
router.get("/order/:id", new orderController().view());
router.post("/order", ensureAuthenticated, new orderController().create());
router.put("/order/:id", ensureAuthenticated, new orderController().update());
router.delete("/order/:id", ensureAuthenticated, new orderController().delete());

export { router };