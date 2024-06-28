import Router from "express";
import CreateProductService from '../../application/product/CreateProductService.js'
import { ValidateTokenMiddleware } from '../middleware/ValidateTokenMiddleware.js'
import UpdateProductService from "../../application/product/UpdateProductService.js";
import GetAllProductService from "../../application/product/GetAllProductService.js";
import GetByIdProductService from "../../application/product/GetByIdProductService.js";
import DeleteProductService from "../../application/product/DeleteProductService.js";

const router = Router()
router.post('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await CreateProductService.create(req.body));
    } catch (err) {
      console.error(`Error while creating product`, err.message);
      next(err);
    }
  }
);

router.put('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UpdateProductService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating product`, err.message);
      next(err);
    }
  }
);

router.get('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetAllProductService.all());
    } catch (err) {
      console.error(`Error while get all product`, err.message);
      next(err);
    }
  }
);

router.get('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetByIdProductService.find(req.params.id));
    } catch (err) {
      console.error(`Error while get by id product`, err.message);
      next(err);
    }
  }
);

router.delete('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await DeleteProductService.delete(req.params.id));
    } catch (err) {
      console.error(`Error while get by id product`, err.message);
      next(err);
    }
  }
);
export default router;