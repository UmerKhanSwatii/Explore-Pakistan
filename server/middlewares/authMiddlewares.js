import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected routes token base
export const requireSignIn = async (req, resp, next) => {
  try {
    console.log(req.headers.authorization);
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    console.warn(decode);

    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      error,
    });
  }
};

export const isAdmin = async (req, resp, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== "Admin") {
      resp.status(401).send({
        success: false,
        message: "Unauthorize access",
      });
    } else {
      next();
    }
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
//seller middleware
export const isSeller = async (req, resp, next) => {
  try {
    console.warn(req.user._id);
    const seller = await userModel.findById(req.user._id);
    if (!seller) {
      return resp.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      success: false,
      message: "Error in seller middleware",
      error,
    });
  }
};
