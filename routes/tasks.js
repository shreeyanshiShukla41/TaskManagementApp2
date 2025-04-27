const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTasks,
  editTask,
  deleteTask,
  countTasks,
  doneStatus
} = require("../controllers/task");
const Task = require("../models/tasks");

router.get("/:userId", getTasks);
router.get("/setTask/:userId", (req, res) => {
  const { userId } = req.params;
  res.render("setTasks", { userId });
});
router.post("/setTask/:userId", setTasks);

router.get("/updateTask/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);

  res.render("edit.ejs", { taskId, task });
});
router.put("/updateTask/:taskId", editTask);

router.delete("/deleteTask/:taskId", deleteTask);

router.get("/:userId/numberOfTasks", countTasks);
// router.post("/:userId/numberOfTasks",countTasks);

router.post("/:taskId/doneTask",doneStatus);

module.exports = router;
