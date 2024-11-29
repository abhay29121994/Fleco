const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, AdminController.getAllUsers);

// for category
router
  .route("/category")
  .post(authMiddleware, adminMiddleware, AdminController.addCategory);

router
  .route("/categories")
  .get(authMiddleware, adminMiddleware, AdminController.getAllCategories);

router
  .route("/category/delete/:id")
  .delete(authMiddleware, adminMiddleware, AdminController.deleteCategory);

router
  .route("/category/:id")
  .get(authMiddleware, adminMiddleware, AdminController.getSingleCategory);

router
  .route("/category/update/:id")
  .patch(AdminController.updateSingleCategory);

//for tags
router
  .route("/tag")
  .post(authMiddleware, adminMiddleware, AdminController.addTag);

router
  .route("/tags")
  .get(authMiddleware, adminMiddleware, AdminController.getAllTags);

router
  .route("/tag/update/:id")
  .patch(authMiddleware, adminMiddleware, AdminController.updateTag);

router
  .route("/tag/delete/:id")
  .delete(authMiddleware, adminMiddleware, AdminController.deleteTag);

module.exports = router;
