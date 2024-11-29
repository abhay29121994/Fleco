const User = require("../models/user-model");
const Category = require("../models/category-model");
const Tag = require("../models/tag-model");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No user found " });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

// add the category
const addCategory = async (req, res) => {
  try {
    const { name, description, color } = req.body;

    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      console.log("Category exist");
      return res.status(400).json({ message: "Category already exist" });
    }

    const response = await Category.create({ name, description, color });
    res.status(201).json({ message: "Category is created." });
  } catch (error) {
    console.error("Error adding category:", error.message || error);
    res.status(500).json({
      message: "An error occurred while creating the category.",
      error: error.message,
    });
  }
};

//view all categories
const getAllCategories = async (req, res) => {
  try {
    const response = await Category.find().sort({ updatedAt: -1 });
    if (!response || response.length === 0) {
      return res.status(400).json({ message: "No category found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//delete single category
const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Category.deleteOne({ _id: id });
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

// getting single category
const getSingleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Category.findOne({ _id: id }).select({
      createdAt: 0,
      updatedAt: 0,
      isActive: 0,
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "No category found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update the category
const updateSingleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCategoryData = req.body;
    const response = await Category.updateOne(
      { _id: id },
      { $set: updatedCategoryData }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//add the tag
const addTag = async (req, res) => {
  try {
    const isAdmin = req.user.isAdmin;
    const userId = req.userId;
    const tag = req.body.name;
    const tagExist = await Tag.findOne({ name: tag });
    if (tagExist) {
      return res.status(400).json({ message: `${tag} already exist.` });
    }
    await Tag.create({
      name: tag,
      createdBy: userId,
      isAdminTag: isAdmin,
    });
    res.status(200).json({ message: `${tag} added. ` });
  } catch (error) {
    res.status(500).json(error);
  }
};
// get all tags
const getAllTags = async (req, res) => {
  try {
    const response = await Tag.find();
    if (response.length === 0) {
      res.status(404).json({ message: "No Tags Found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// update the tag
const updateTag = async (req, res) => {
  try {
    const tagId = req.params.id;
    const updatedTagData = req.body;
    const response = await Tag.updateOne(
      { _id: tagId },
      { $set: updatedTagData },
      { new: true }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//delete tag
const deleteTag = async (req, res) => {
  try {
    const tagId = req.params.id;
    const response = await Tag.deleteOne({ _id: tagId });
    if (response) {
      res.status(200).json({ message: "Tag is deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getAllUsers,
  addCategory,
  getAllCategories,
  deleteCategory,
  getSingleCategory,
  updateSingleCategory,
  addTag,
  getAllTags,
  updateTag,
  deleteTag,
};
