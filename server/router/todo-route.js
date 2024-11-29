const express = require("express");
const router = express.Router();
const Todo = require("../controllers/todo-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/addtodo").post(authMiddleware, Todo.addTodo);

router.route("/categories").get(Todo.categories);

router.route("/pendingtask").get(authMiddleware, Todo.pendingTask);

router.route("/completedtask").get(authMiddleware, Todo.completedTask);

router.route("/delete/:id").delete(authMiddleware, Todo.deleteTodo);

router.route("/status/update/:id").patch(authMiddleware, Todo.completedTodo);

router.route("/updatetask").patch(authMiddleware, Todo.updateTodo);

router
  .route("/changestatus/update/:id")
  .patch(authMiddleware, Todo.changeStatus);

module.exports = router;
