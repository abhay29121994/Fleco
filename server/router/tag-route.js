const express = require("express");
const router = express.Router();
const Tag = require("../controllers/tag-controller");
const authMiddleware = require("../middlewares/auth-middleware");

// router.route("/suggest-tags/:query").get(authMiddleware,Tag.suggestTags);

router.route("/checkandstoretags").post(authMiddleware, Tag.checkAndStoreTags);

module.exports = router;
