//update user controller

import { hashPassword } from "../helpers/authHelpers.js";
import orderModel from "../models/orderModel.js";
import reportModel from "../models/reportModel.js";

import userModel from "../models/userModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

//getSingleUserController
export const getSingleUserController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);
    console.warn(id);
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    resp.status(200).send({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting a single user",
      error,
    });
  }
};

export const updateUserController = async (req, resp) => {
  try {
    console.warn(req.body);
    const { name, email, phone, city } = req.body;
    console.warn(email);

    //find user
    const user = await userModel.findOne({ email });
    // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);

    // file get from client photo
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    if (!user) {
      resp.send({
        success: false,
        message: "User not found",
      });
      return;
    }

    //update user
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        email: email,

        city: city || user.city,
        phone: phone || user.phone,
        profilePic: {
          public_id: cdb.public_id,
          url: cdb.secure_url,
        },
      },
      {
        new: true,
      }
    );

    resp.status(201).send({
      success: true,
      message: "Profile updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//reportProblemController

export const reportProblemController = async (req, resp) => {
  try {
    const { name, email, contactNumber, description, type, comments } =
      req.body;
    if (!name) {
      return resp.send({
        success: false,
        message: " Name is required",
      });
    }

    if (!email) {
      return resp.send({
        success: false,
        message: "Email Name is required",
      });
    }
    if (!contactNumber) {
      return resp.send({
        success: false,
        message: "Contact Number is required",
      });
    }
    if (!description) {
      return resp.send({
        success: false,
        message: "Description is required",
      });
    }
    if (!type) {
      return resp.send({
        success: false,
        message: "Type is required",
      });
    }
    if (!comments) {
      return resp.send({
        success: false,
        message: "Comments are required",
      });
    }
    const report = await new reportModel({
      name,
      email,
      contactNumber,
      description,
      type,
      comments,
    }).save();
    resp.status(201).send({
      success: true,
      message: "Problem report",
      report,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while reporting a problem",
      error,
    });
  }
};

//getOrdersController
export const getOrdersController = async (req, resp) => {
  try {
    const { id } = req.params;
    console.warn(id);
    const orders = await orderModel
      .find({
        buyer: id,
      })
      .populate([
        {
          path: "service",
          model: "service",
          populate: {
            path: "city",
            model: "cities",
          },
        },
        {
          path: "buyer",
          model: "user",
        },
      ]);
    if (!orders) {
      resp.status(404).send({
        success: false,
        message: "No order found",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "Orders get successfully",
        orders,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//getPurchasedHistoryController
export const getPurchasedHistoryController = async (req, resp) => {
  try {
    console.warn(req?.user?._id);
    const purchasedServices = await orderModel
      .find({ buyer: req?.user?._id })
      .populate("service", [
        "_id",
        "name",
        "profilePic",
        "description",
        "price",
        "startDate",
        "endDate",
        "city",
      ]);

    if (!purchasedServices) {
      return resp.json({
        success: false,
        message: "No purchased services  found",
      });
    }

    resp.status(200).send({
      success: true,
      message: "All purchased services history",
      purchasedServices,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPhotoController = async (req, resp) => {
  try {
    const user = await userModel.findById(req.params.id).select("image");
    if (user?.image) {
      return resp.status(200).send(user?.image);
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

//getUserRequests
export const getUserRequests = async (req, resp) => {
  try {
    console.warn(req.user._id);

    const requests = await orderModel
      .find({
        seller: req.user._id,
      })
      .populate({
        path: "seller",
        model: "user",
        select: "_id name",
      })
      .populate({
        path: "buyer",
        model: "user",
        select: "_id name phone email",
      });
    console.warn(requests);

    if (!requests) {
      return resp.send({
        success: false,
        message: "No user request",
      });
    } else {
      resp.status(200).send({
        success: true,
        message: "user requests",
        requests,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while get booking requests",
      error,
    });
  }
};
