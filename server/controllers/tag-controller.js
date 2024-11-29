const Tag = require("../models/tag-model");

const checkAndStoreTags = async (req, res) => {
  const userId = req.userId;
  const tags = req.body.tags;
  try {
    const tagIds = [];

    for (let tagName of tags) {
      const newTag = new Tag({
        name: tagName,
        createdBy: userId,
      });
      const saveTag = await newTag.save();
      console.log(saveTag);
      tagIds.push(saveTag._id);
    }

    console.log(tagIds);
    res.status(200).json({ tagIds });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { checkAndStoreTags };
