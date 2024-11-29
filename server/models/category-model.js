const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: { type: String, trim: true, default: "" },
    color: { type: String, default: "#FFFFFF" },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
