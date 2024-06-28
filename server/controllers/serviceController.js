import slugify from "slugify";
import serviceModel from "../models/serviceModel.js";

import dotenv from "dotenv";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANTID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-04-10" });
export const createserviceController = async (req, resp) => {
  try {
    const { name, startDate, endDate, description, price, category } = req.body;

    // file get from client photo
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    //validation
    switch (true) {
      case !name:
        return resp.send({
          success: false,
          message: "Name is required",
        });
      case !file:
        return resp.send({
          success: false,
          message: "Image is required",
        });

      case !startDate:
        return resp.send({
          success: false,
          message: "StartDate is required",
        });
      case !endDate:
        return resp.send({
          success: false,
          message: "endDate is required",
        });
      case !price:
        return resp.send({
          success: false,
          message: "Price is required",
        });
      case !description:
        return resp.send({
          success: false,
          message: "Description is required",
        });

      case !category:
        return resp.send({
          success: false,
          message: "Category is required",
        });
    }

    const service = new serviceModel({
      ...req.body,
      slug: slugify(name),
      postedBy: req?.user?._id,
      profilePic: {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      },
    });
    console.warn(service);
    await service.save();
    resp.status(201).send({
      success: true,
      message: "service added successfully",
      service,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while creating service",
      error,
    });
  }
};

//GetAllserviceController
export const getAllserviceController = async (req, resp) => {
  try {
    const services = await serviceModel
      .find({})
      .populate("postedBy")

      .limit(12)

      .sort({ createdAt: -1 });
    console.warn(services);

    resp.status(201).send({
      success: true,
      message: "All services",
      count: services.length,
      services,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting all services",
      error,
    });
  }
};
//GetSingleserviceController
export const getSingleserviceController = async (req, resp) => {
  try {
    const service = await serviceModel
      .findOne({ slug: req.params.slug })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          model: "user",
          select: "name",
        },
      });

    if (!service) {
      resp.status(404).send({
        success: false,
        message: "No service found",
      });
    }

    let averageRating = 0;
    const reviewsCount = service.reviews.length;

    if (reviewsCount > 0) {
      const totalRating = service.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );

      // Calculate average rating
      averageRating = totalRating / reviewsCount;
    }

    console.warn(averageRating); // Output the average rating
    service.averageRating = averageRating;
    service.save();

    resp.status(200).send({
      success: true,
      message: "Single service fetched",
      service,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting single service",
      error,
    });
  }
};

export const getSingleService = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);
    // find service on base of id
    console.warn(typeof id);
    const services = await serviceModel
      .find({
        postedBy: id,
      })
      .populate("postedBy", "name");
    if (!services) {
      return resp.send({
        success: false,
        message: "No service found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "All services",
      services,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting  services*",
      error,
    });
  }
};
//UpdateserviceController
export const updateserviceController = async (req, resp) => {
  try {
    console.warn("hello");
    const { name, city, startDate, endDate, description, category, price } =
      req.body;
    console.warn(name);
    console.warn(req.body);
    // file get from client photo
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    //validation
    switch (true) {
      case !name:
        return resp.send({
          success: false,
          message: "Name is required",
        });
      case !file:
        return resp.send({
          success: false,
          message: "Image is required",
        });
      case !city:
        return resp.send({
          success: false,
          message: "City is required",
        });
      case !startDate:
        return resp.send({
          success: false,
          message: "StartDate is required",
        });
      case !endDate:
        return resp.send({
          success: false,
          message: "endDate is required",
        });
      case !description:
        return resp.send({
          success: false,
          message: "Description is required",
        });
      case !price:
        return resp.send({
          success: false,
          message: "Price is required",
        });
      case !category:
        return resp.send({
          success: false,
          message: "Category is required",
        });
    }

    const service = await serviceModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        profilePic: {
          public_id: cdb.public_id,
          url: cdb.secure_url,
        },
        slug: slugify(name),
      },
      { new: true }
    );

    resp.status(201).send({
      success: true,
      message: "service updated successfully",
      service,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating service",
      error,
    });
  }
};

//Deleteservicecontroller
export const deleteserviceController = async (req, resp) => {
  try {
    console.warn("hekko");
    await serviceModel.findByIdAndDelete(req.params.id);
    resp.status(200).send({
      success: true,
      message: "service deleted successfully",
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while deleting service",
      error,
    });
  }
};

// service count
export const serviceCountController = async (req, resp) => {
  try {
    const total = await serviceModel.find({}).estimatedDocumentCount();
    resp.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "Error in service count",
      error,
      success: false,
    });
  }
};

export const serviceListController = async (req, resp) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    console.warn(perPage);

    const services = await serviceModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    resp.status(200).send({
      success: true,
      services,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "error in per page ctrl",
      error,
      success: false,
    });
  }
};

//getCategoryBaseServiceController
export const getCategoryBaseServiceController = async (req, resp) => {
  try {
    console.warn(req.params.slug);
    const service = await serviceModel
      .find({ category: req.params.slug })
      .populate("postedBy");

    if (!service) {
      resp.status(404).send({
        success: false,
        message: "No service found",
      });
    }

    // let averageRating = 0;
    // const reviewsCount = service.reviews.length;

    // if (reviewsCount > 0) {
    //   const totalRating = service.reviews.reduce(
    //     (acc, review) => acc + review.rating,
    //     0
    //   );

    //   // Calculate average rating
    //   averageRating = totalRating / reviewsCount;
    // }

    // console.warn(averageRating); // Output the average rating
    // service.averageRating = averageRating;
    // service.save();

    resp.status(200).send({
      success: true,
      message: "Category base services fetched",
      service,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting single service",
      error,
    });
  }
};

//getZoneWithCityNameController

export const getServicesWithCityNameController = async (req, resp) => {
  try {
    const { cityName } = req.params;
    console.warn(cityName);

    // Fetch all services, populate associated cities
    const services = await serviceModel.find().populate("city", "cityName"); // Populate city and select only 'cityName' field

    // Filter services based on the city name
    const filteredServices = services.filter((service) => {
      return service.city.cityName === cityName;
    });
    console.warn(filteredServices);
    resp.status(200).send({
      success: true,
      message: `${cityName} services`,
      filteredServices,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting services on base of cityName",
      error,
    });
  }
};

//searchServiceController
export const searchServiceController = async (req, resp) => {
  try {
    const { keyword } = req.params;
    const services = await serviceModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    resp.status(200).send({
      success: true,
      message: "Search services",
      services,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while searching",
      error,
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    console.warn(req.body);
    const { nonce, service } = req.body;

    let newTransaction = gateway.transaction.sale(
      {
        amount: service?.price,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            service: service?._id,
            payment: service?.price,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

//serviceratingController
export const serviceRatingController = async (req, resp) => {
  try {
    const { id, rating, reviews } = req.body;

    console.warn(req.body);
    // Check if user has already given a review for the service
    const existingReview = await serviceModel.find({
      _id: id,
      "reviews.user": req.user._id,
    });

    if (Array.isArray(existingReview) && existingReview.length > 0) {
      return resp.send({
        success: false,
        message: "You have already provided a review for this service.",
      });
    }
    const newReview = {
      rating,
      reviews,
      user: req.user._id,
    };

    // Find service and push the new review
    const service = await serviceModel.findByIdAndUpdate(
      id,
      {
        $push: {
          reviews: newReview,
        },
      },
      {
        new: true,
      }
    );

    resp.status(201).send({
      success: true,
      message: "Review added successfully",
      service,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//typeBaseServiceController
export const typeBaseServiceController = async (req, resp) => {
  const { type } = req.params;

  try {
    const services = await serviceModel
      .find({ category: type })
      .select("-photo");

    if (!services || services.length === 0) {
      return resp.send({
        success: false,
        message: "No services found for the given category",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: `${type} services get successfully`,
        services,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while searching services based on type ",
      error,
    });
  }
};

//createPaymentIntentController
export const createPaymentIntentController = async (req, resp) => {
  try {
    const { service } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: service?.price, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;
    if (clientSecret) {
      const order = new orderModel({
        service: service?._id,
        payment: service?.price,
        buyer: req.user._id,
        seller: service?.postedBy,
      }).save();
      resp.send({
        success: true,
        clientSecret,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while paying ",
      error,
    });
  }
};
