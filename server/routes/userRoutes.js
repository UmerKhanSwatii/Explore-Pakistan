import express from "express";
import {
  getOrdersController,
  getPhotoController,
  getPurchasedHistoryController,
  getSingleUserController,
  getUserRequests,
  reportProblemController,
  updateUserController,
} from "../controllers/userController.js";
import { isSeller, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  DeleteAllNotificationsController,
  getAllNotificationsController,
} from "../controllers/notificationController.js";
import { singleUpload } from "../config/multerConfig.js";
// import upload from "../config/multerConfig.js";

//Router object
const router = express.Router();

//Routing

//Update profile || Method Post

router.put("/update", singleUpload, updateUserController);

//Get single user || Method get
router.get("/single-user/:id", requireSignIn, getSingleUserController);

//Post Reports || Methos Post
router.post("/report", requireSignIn, reportProblemController);

//Get All notifications || Method post
router.post(
  "/get-notifications",
  requireSignIn,

  getAllNotificationsController
);

//Delere All notifications || Method post
router.post(
  "/delete-notifications",
  requireSignIn,

  DeleteAllNotificationsController
);
//get orders ||Method-get
router.get("/get-orders/:id", requireSignIn, getOrdersController);

//get purchased history || Method-get
router.get(
  "/get-purchased-history",
  requireSignIn,
  getPurchasedHistoryController
);

//get explorer requests || Method get
router.get("/get-user-requests", requireSignIn, isSeller, getUserRequests);

export default router;
