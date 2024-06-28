import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryControllers.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import { singleUpload } from "../config/multerConfig.js";
// import upload from "../config/multerConfig.js";
const router = express.Router();

//Create category || Method Post
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  singleUpload,

  createCategoryController
);

//Update category || Method Put
router.put(
  "/update-category/:id",
  requireSignIn,

  isAdmin,
  singleUpload,
  updateCategoryController
);
//Get All category || Method get
router.get("/category", getAllCategoryController);
//Get Single category || Method get
router.get("/category/:slug", getSingleCategoryController);
//Delete category || Method delete
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
