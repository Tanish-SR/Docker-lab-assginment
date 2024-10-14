const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

// localhost:3000
router.route("/")
.get(taskController.getAllTask)
.post(taskController.createTask);

// localhost:3000/:id
router.route("/:id")
.get(taskController.getOneTask)
.patch(taskController.updateTasks)
.delete(taskController.deleteTasks);

module.exports = router;