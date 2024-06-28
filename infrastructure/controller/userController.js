import Router from "express";
import { ValidateTokenMiddleware } from '../middleware/ValidateTokenMiddleware.js'
import GetByIdPersonService from "../../application/person/GetByIdPersonService.js";
import CreateUserService from "../../application/user/CreateUserService.js";
import GetAllUserService from "../../application/user/GetAllUserService.js";
import UpdateUserService from "../../application/user/UpdateUserService.js";
import DeleteUserService from "../../application/user/DeleteUserService.js";

const router = Router()
router.post('', 
  async function (req, res, next) {
    try {
      res.json(await CreateUserService.create(req.body));
    } catch (err) {
      console.error(`Error while creating person`, err.message);
      next(err);
    }
  }
);

router.put('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UpdateUserService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
  }
);

router.get('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetAllUserService.all());
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
      res.json(await DeleteUserService.delete(req.params.id));
    } catch (err) {
      console.error(`Error while get by id user`, err.message);
      next(err);
    }
  }
);

export default router;