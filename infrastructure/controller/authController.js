import Router from "express";
import LoginService from "../../application/auth/LoginService.js";
const router = Router()
router.post('/authenticate',
  async function (req, res, next) {
    try {
      res.json(await LoginService.login(req.body));
    } catch (err) {
      console.error(`Error while creating person`, err.message);
      next(err);
    }
  }
);

export default router;