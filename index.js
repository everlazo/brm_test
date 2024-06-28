import express, { json, urlencoded } from "express";
import authRouter from './infrastructure/controller/authController.js'
import personController from './infrastructure/controller/personController.js'
import userController from './infrastructure/controller/userController.js'
import productController from './infrastructure/controller/productController.js'
import purchaseController from './infrastructure/controller/purchaseController.js'
import cors from 'cors';

const app = express();
const port = 3000;
app.use(json());
app.use(cors());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use("/auth", authRouter);
app.use("/person", personController);
app.use("/user", userController);
app.use("/product", productController);
app.use("/purchase", purchaseController);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Servidor corriendo por http://localhost:${port}`);
});