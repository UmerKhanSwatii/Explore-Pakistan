import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  getAllReportsController,
  getAllUsersController,
  getSingleReportController,
  getUsersController,
  makeAdminController,
  removeAdminController,
  resolveReportController,
  sendNotificationController,
} from "../controllers/adminControllers.js";

//Router object
const router = express.Router();

//Routing

//Get users || METHOD get
router.get("/get-all", requireSignIn, isAdmin, getUsersController);

//Get All user || METHOD get
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

//Make Admin || Method put
router.put("/make-admin/:id", requireSignIn, isAdmin, makeAdminController);
//Remove Admin || Method put
router.put("/remove-admin/:id", requireSignIn, isAdmin, removeAdminController);
//Get Reports || Method Get
router.get("/get-reports", requireSignIn, isAdmin, getAllReportsController);

//Get Single Report || Method Get
router.get(
  "/get-reports/:id",
  requireSignIn,
  isAdmin,
  getSingleReportController
);
// resolve Report || Method delete
router.delete(
  "/resolve-reports/:id",
  requireSignIn,
  isAdmin,
  resolveReportController
);

//send notifications
router.put(
  "/send-notification",
  requireSignIn,
  isAdmin,
  sendNotificationController
);

export default router;
