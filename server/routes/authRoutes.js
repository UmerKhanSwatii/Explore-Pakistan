import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
} from "../controllers/authControllers.js";
import {
  isAdmin,
  isSeller,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";

//Router object
const router = express.Router();

//Routing

//Register || Method Post
router.post("/register", registerController);

//Login || Method Post
router.post("/login", loginController);

//Protected user route auth
router.get("/user-auth", requireSignIn, (req, resp) => {
  return resp.send({
    ok: true,
  });
});

//Protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, resp) => {
  return resp.send({
    ok: true,
  });
});
//Protected seller route auth
router.get("/seller-auth", requireSignIn, isSeller, (req, resp) => {
  return resp.send({
    ok: true,
  });
});

//Forgot Password || Method POST
router.post("/forgot-password", forgotPasswordController);

export default router;
