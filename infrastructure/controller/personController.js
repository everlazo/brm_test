import Router from "express";
import CreatePersonService from '../../application/person/CreatePersonService.js'
import { ValidateTokenMiddleware } from '../middleware/ValidateTokenMiddleware.js'
import UpdatePersonService from "../../application/person/UpdatePersonService.js";
import GetAllPersonService from "../../application/person/GetAllPersonService.js";
import GetByIdPersonService from "../../application/person/GetByIdPersonService.js";
import DeletePersonService from "../../application/person/DeletePersonService.js";

const router = Router()
router.post('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await CreatePersonService.create(req.body));
    } catch (err) {
      console.error(`Error while creating person`, err.message);
      next(err);
    }
  }
);

router.put('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UpdatePersonService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating person`, err.message);
      next(err);
    }
  }
);

router.get('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetAllPersonService.all());
    } catch (err) {
      console.error(`Error while get all person`, err.message);
      next(err);
    }
  }
);

router.get('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetByIdPersonService.find(req.params.id));
    } catch (err) {
      console.error(`Error while get by id person`, err.message);
      next(err);
    }
  }
);

router.delete('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await DeletePersonService.delete(req.params.id));
    } catch (err) {
      console.error(`Error while get by id person`, err.message);
      next(err);
    }
  }
);
export default router;