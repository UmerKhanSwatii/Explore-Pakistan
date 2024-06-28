import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";

//registerController

export const registerController = async (req, resp) => {
  try {
    console.warn("helo");
    const { name, email, password, city, phone, role, answer } = req.body;
    if (!name) {
      return resp.send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return resp.send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return resp.send({
        success: false,
        message: "Password is required",
      });
    }
    if (!answer) {
      return resp.send({
        success: false,
        message: "Answer is required",
      });
    }
    if (!phone) {
      return resp.send({
        success: false,
        message: "Contact no is required",
      });
    }
    if (!city) {
      return resp.send({
        success: false,
        message: "City is required",
      });
    }
    if (!role) {
      return resp.send({
        success: false,
        message: "Role is required",
      });
    }
    //check user
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return resp.send({
        success: false,
        message: "User already Registered",
      });
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    // create new user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      city,
      phone,
      role,
      answer,
    }).save();

    resp.send({
      success: true,
      message: "Register successfully",
      user,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

//login controller

export const loginController = async (req, resp) => {
  try {
    console.warn("hello");
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.send({
        success: false,
        message: "please add email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return resp.send({
        success: false,
        message: "Please register",
      });
    } else {
      const matchPassword = await comparePassword(password, user?.password);
      if (!matchPassword) {
        return resp.send({
          success: false,
          message: "Invalid password",
        });
      }
      const token = JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return resp.send({
        success: true,
        message: "Login Successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: password,
          city: user.city,
          phone: user.phone,
          role: user.role,
          notification: user.notification,
          seenNotification: user.seenNotification,
          profilePic: user.profilePic,
        },
        token,
      });
    }
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//fogot password controller
export const forgotPasswordController = async (req, resp) => {
  try {
    const { email, answer, newPassword } = req.body;
    console.warn(email, answer, newPassword);
    if (!email) {
      return resp.send({
        message: "Email is required",
      });
    }
    if (!answer) {
      return resp.send({
        message: "Answer is required",
      });
    }
    if (!newPassword) {
      return resp.send({
        message: "NewPassword is required",
      });
    }
    //check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return resp.send({
        success: false,
        message: "Invalid email or answer",
      });
    }
    //hash new password
    const hash = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hash });
    resp.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};
