import Router from "express";
import CreatePurchaseService from '../../application/purchase/CreatePurchaseService.js'
import { ValidateTokenMiddleware } from '../middleware/ValidateTokenMiddleware.js'
import UpdatePurchaseService from "../../application/purchase/UpdatePurchaseService.js";
import GetAllPurchaseService from "../../application/purchase/GetAllPurchaseService.js";
import GetByIdPurchaseService from "../../application/purchase/GetByIdPurchaseService.js";
import GetPurchaseHistoryByClientService from "../../application/purchase/GetPurchaseHistoryByClientService.js";
import { getSessionFromRequest } from "../../shared/token-actions.js";
// import PurchaseHistoryService from "../../application/purchase/PurchaseHistoryService.js";

const router = Router()
router.post('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await CreatePurchaseService.create(req.body));
    } catch (err) {
      console.error(`Error while creating purchase`, err.message);
      next(err);
    }
  }
);

router.put('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await UpdatePurchaseService.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating purchase`, err.message);
      next(err);
    }
  }
);

router.get('', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetAllPurchaseService.find(req.params.id));
    } catch (err) {
      console.error(`Error while get all purchase`, err.message);
      next(err);
    }
  }
);

router.get('/:id', [ValidateTokenMiddleware],
  async function (req, res, next) {
    try {
      res.json(await GetByIdPurchaseService.find(req.params.id));
    } catch (err) {
      console.error(`Error while get by id purchase`, err.message);
      next(err);
    }
  }
);

router.get('/history-by-client/:id', [ValidateTokenMiddleware],
    async function (req, res, next) {
  try {
      console.log({usuariologueado: getSessionFromRequest(req)})
      const history = await GetPurchaseHistoryByClientService.getPurchaseHistoryByClient(req.params.id);
      res.json(history);
  } catch (err) {
      console.error(`Error while fetching purchase history`, err.message);
      next(err);
  }
});

export default router;