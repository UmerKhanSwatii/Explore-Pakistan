import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import dotenv from "dotenv";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
dotenv.config();
//create category controller
export const createCategoryController = async (req, resp) => {
  try {
    const { name } = req.body;
    // file get from client photo
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    if (!name) {
      return resp.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!file) {
      return resp.status(400).send({
        success: false,
        message: "ImageName is required",
      });
    }

    //existing category
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return resp.status(200).send({
        success: false,
        message: "Category Already exist",
      });
    }
    const category = new categoryModel({
      name,
      profilePic: {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      },
      slug: slugify(name),
    });

    await category.save();

    resp.status(201).send({
      success: true,
      message: "Category created",
      category,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};

//update category
export const updateCategoryController = async (req, resp) => {
  try {
    console.warn(req.body);
    const { name } = req.body;
    const { id } = req.params;
    // delete prev image

    //find category
    const cat = await categoryModel.findById(id);

    await cloudinary.v2.uploader.destroy(cat.profilePic.public_id);
    // update
    // file get from client photo
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);

    if (!name) {
      return resp.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!file) {
      return resp.status(400).send({
        success: false,
        message: "image is required",
      });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,

      {
        name,
        slug: slugify(name),
        profilePic: {
          public_id: cdb.public_id,
          url: cdb.secure_url,
        },
      },
      { new: true }
    );
    resp.status(201).send({
      success: true,
      message: "Category updated Successfully",
      category,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while updating category",
    });
  }
};
//get all category
export const getAllCategoryController = async (req, resp) => {
  try {
    const categories = await categoryModel.find({});
    resp.status(200).send({
      success: true,
      message: "All categories list",
      categories,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting all categories",
    });
  }
};

//single category
export const getSingleCategoryController = async (req, resp) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    resp.status(200).send({
      success: true,
      message: "Get single category successfully",
      category,
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Error while getting single category",
      error,
    });
  }
};
//delete category
export const deleteCategoryController = async (req, resp) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    resp.status(200).send({
      success: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.warn(error);
    resp.status(500).send({
      success: false,
      message: "Erorr while deleted category",
    });
  }
};
