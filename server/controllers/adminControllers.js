import reportModel from "../models/reportModel.js";
import userModel from "../models/userModel.js";

//getUsersController
export const getUsersController = async (req, resp) => {
  try {
    //get all users
    const users = await userModel.find({});
    if (!users || users.length === 0) {
      return resp.send({
        success: false,
        message: "No user found",
      });
    }
    //filter admin from users
    const filterUsers = users.filter((user) => user?.role !== "Seller");
    resp.status(200).send({
      success: true,
      message: "All users get successfully",
      filterUsers,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//getAllUsersController
export const getAllUsersController = async (req, resp) => {
  try {
    //get all users
    const users = await userModel.find({});
    if (!users || users.length === 0) {
      return resp.send({
        success: false,
        message: "No user found",
      });
    }

    resp.status(200).send({
      success: true,
      message: "All users get successfully",
      users,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
//makeAdminController
export const makeAdminController = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      role: "Admin",
    });
    resp.status(201).send({
      success: true,
      message: " Role updated to Admin successfully",
      user,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while making user admin",
      error,
    });
  }
};

//removeAdminController
export const removeAdminController = async (req, resp) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndUpdate(id, {
      role: "user",
    });
    resp.status(201).send({
      success: true,
      message: "Role change  successfully",
      user,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while making user admin",
      error,
    });
  }
};

//getAllReportsController
export const getAllReportsController = async (req, resp) => {
  try {
    const reports = await reportModel.find({});
    resp.status(200).send({
      success: true,
      message: "All reports",
      reports,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting a reports",
      error,
    });
  }
};
//get single report
export const getSingleReportController = async (req, resp) => {
  try {
    const report = await reportModel.findOne({ _id: req.params.id });
    resp.status(200).send({
      success: true,
      message: "Report",
      report,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while getting a single report",
      error,
    });
  }
};

//  resolveReportController
export const resolveReportController = async (req, resp) => {
  try {
    const { id } = req.params;
    //find report by id
    const report = await reportModel.findByIdAndDelete(id);
    resp.status(200).send({
      success: true,
      message: "Report resolved successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while resolving a single report",
      error,
    });
  }
};

//sendNotificationController
export const sendNotificationController = async (req, resp) => {
  try {
    const { userIds, description } = req.body;
    if (!userIds || userIds.length === 0) {
      return resp.send({
        success: false,
        message: "Please select users",
      });
    }
    if (!description) {
      return resp.send({
        success: false,
        message: "Description is required",
      });
    }
    await userModel.updateMany(
      {
        _id: {
          $in: userIds,
        },
      },
      {
        $push: {
          notification: {
            description,
          },
        },
      }
    );

    resp.status(201).send({
      success: true,
      message: "Notification send Successfully",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Error while sending notifications",
      error: error.message,
    });
  }
};
