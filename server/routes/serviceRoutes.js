import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createPaymentIntentController,
  createserviceController,
  deleteserviceController,
  getAllserviceController,
  getCategoryBaseServiceController,
  getServicesWithCityNameController,
  getSingleService,
  getSingleserviceController,
  searchServiceController,
  serviceCountController,
  serviceListController,
  serviceRatingController,
  typeBaseServiceController,
  updateserviceController,
} from "../controllers/serviceController.js";

import { isSeller, requireSignIn } from "../middlewares/authMiddlewares.js";
import { singleUpload } from "../config/multerConfig.js";
import formidable from "express-formidable";
const router = express.Router();

//Add service || Method POST
router.post(
  "/create-service",

  requireSignIn,
  isSeller,
  singleUpload,

  createserviceController
);

//Update service || Method PUT
router.put(
  "/update-service/:id",

  requireSignIn,
  isSeller,
  singleUpload,

  updateserviceController
);

//Get service || Method GET
router.get("/get-service/:slug", getSingleserviceController);
//Get category base services || Method GET
router.get("/get-services/:slug", getCategoryBaseServiceController);
//Get All service || Method GET
router.get("/get-service", getAllserviceController);

//get single service
router.get("/single/:id", getSingleService);
//Delete  service || Method DELETE
router.delete(
  "/delete-service/:id",
  requireSignIn,

  deleteserviceController
);

//service count
router.get("/service-count", serviceCountController);
//service based on type
router.get("/service-type/:type", typeBaseServiceController);
//service per page
router.get("/service-list/:page", serviceListController);

//GET Services on base of city name || Get Method
router.get(
  "/get-services-cityName/:cityName",
  getServicesWithCityNameController
);
//search services || GET METHOD
router.get("/search/:keyword", searchServiceController);

//PAYMENT
//token
router.get("/token", braintreeTokenController);

//payment
//token
router.post("/payment", requireSignIn, brainTreePaymentController);

//create-payment-intent
router.post(
  "/create-payment-intent",
  requireSignIn,

  createPaymentIntentController
);
//rating ||Method-POST
router.post("/service-rating", requireSignIn, serviceRatingController);

export default router;
