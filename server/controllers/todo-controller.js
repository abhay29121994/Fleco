const Todo = require("../models/todo-model");
// const Categories = require("../models/category-model");
const Category = require("../models/category-model");
const Tag = require("../models/tag-model");
const addTodo = async (req, res) => {
  try {
    // Save the new Todo
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();

    // Update each Tag to include the new Todo ID
    const tagIds = req.body.tag; // Tag IDs are sent in the request body
    console.log(tagIds);
    const x = await Tag.updateMany(
      { _id: { $in: tagIds } }, // Match all tags in the array
      { $set: { todoId: savedTodo._id } } // Overwrite `todoId` with the new Todo ID
    );
    console.log(x);
    res.status(200).json(savedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

const pendingTask = async (req, res) => {
  try {
    const pendingTask = await Todo.find({
      status: "pending",
      createdBy: req.userId,
    })
      .populate("category") // Populate the category field
      .populate("tag"); // Populate the tag field
    if (pendingTask.length > 0) {
      res.status(200).json(pendingTask);
    } else {
      res.status(200).json({ message: "No Pending Task Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};

const completedTask = async (req, res) => {
  try {
    const completedTask = await Todo.find({
      status: "completed",
      createdBy: req.userId,
    })
      .populate("category")
      .populate("tag");
    if (completedTask.length > 0) {
      res.status(200).json(completedTask);
    } else {
      res.status(200).json({ message: "No Completed Task Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error");
  }
};
const categories = async (req, res) => {
  try {
    const response = await Category.find();
    if (response.length === 0) {
      res.status(404).json({ message: "No Category Found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId).populate("tag");
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const tagIds = todo.tag.map((tag) => tag._id);
    await Tag.deleteMany({ _id: { $in: tagIds } });
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json("Todo deleted successfully.");
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const completedTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // Find the todo by ID and update the status
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status: "completed" }, // Update the status field
      { new: true } // Return the updated document
    );

    // Check if the todo was found and updated
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status: "pending" },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res
      .status(200)
      .json({ message: "Status updated successfully", todo: updatedTodo });
  } catch (error) {}
};

const updateTodo = async (req, res) => {
  const { tag, title, description, category } = req.body;
  const todoId = req.body._id;

  try {
    const existingTags = await Tag.find({ todoId });

    const existingTagIds = existingTags.map((tag) => tag._id.toString());
    // console.log(req.body);
    const frontendTagIds = tag.filter((tag) => tag._id).map((tag) => tag._id);

    const deletedTagIds = existingTagIds.filter(
      (id) => !frontendTagIds.includes(id)
    );

    const newTags = tag.filter((tag) => !tag._id);
    await Tag.deleteMany({ _id: { $in: deletedTagIds } });

    // Add new tags
    const createdTags = await Tag.insertMany(
      newTags.map((tag) => ({
        ...tag,
        todoId,
        createdBy: req.userId, // Replace with your user authentication logic
      }))
    );
    const newTagIds = createdTags.map((tag) => tag._id);
    const updatedTagIds = [...frontendTagIds, ...newTagIds];
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $pull: { tags: { $in: deletedTagIds } }, // Remove deleted tag IDs
        tag: updatedTagIds,
        title,
        description,
        category,
      },
      { new: true } // Return the updated document
    );
    console.log(updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  addTodo,
  categories,
  pendingTask,
  completedTask,
  deleteTodo,
  completedTodo,
  updateTodo,
  changeStatus
};
