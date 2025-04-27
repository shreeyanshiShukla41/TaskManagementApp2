const Task = require("../models/tasks");
const User = require("../models/user");

const getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const tasks = await Task.find({ userId });
    const completedTasks = await Task.find({ status: "completed" });
    const status = ["pending", "completed", "inprogress"];
    const pending = await Task.countDocuments({
      $and: [{ status: "pending" }, { userId: userId }],
    });
    const completed = await Task.countDocuments({
      $and: [{ status: "completed" }, { userId: userId }],
    });
    const ongoing = await Task.countDocuments({
      $and: [{ userId: userId }, { status: "inprogress" }],
    });

    res.render("showtasks", {
      tasks,
      userId,
      status,
      pending,
      completed,
      ongoing,
      completedTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setTasks = async (req, res) => {
  try {
    const { task, description, DOS, DOE, natureOfTask, status, userId } =
      req.body;
    console.log(req.body);
    const newTask = new Task({
      task,
      description,
      DOS,
      DOE,
      status,
      natureOfTask,
      userId,
    });
    // const user = await User.findOne({name});
    // console.log("user "+user)
    // newTask.userId = user._id;
    newTask.save();
    if (newTask) {
      res.status(200).redirect(`/api/tasks/${userId}`);
    } else {
      res.status(500).json({ message: "Task not saved" });
    }
  } catch (e) {
    console.log(e);
  }
};

const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const taskEdited = await Task.findById(taskId);
    const userId1 = taskEdited.userId;
    const { task, description, DOS, DOE, natureOfTask, status, userId } =
      req.body;

    const taskToBeUpdated = await Task.findByIdAndUpdate(
      taskId,
      {
        task: task,
        description: description,
        DOS: DOS,
        DOE: DOE,
        natureOfTask: natureOfTask,
        status: status,
        userId: userId,
      },
      { runValidators: true, new: true }
    );
    taskToBeUpdated.save();
    return res.redirect(`/api/tasks/${userId1}`);
  } catch (e) {
    console.log(e);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    const userId = task.userId;

    res.redirect(`/api/tasks/${userId}`);
  } catch (e) {
    console.log(e);
  }
};

const countTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.findById(userId);
    const pending = await Task.countDocuments({
      $and: [{ status: "pending" }, { userId: userId }],
    });
    const completed = await Task.countDocuments({
      $and: [{ status: "completed" }, { userId: userId }],
    });
    const ongoing = await Task.countDocuments({
      $and: [{ userId: userId }, { status: "inprogress" }],
    });
    res.render("d3", { pending, completed, ongoing });
  } catch (e) {
    console.log(e);
  }
};



const doneStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.find({ taskId });

    task.status = "completed";
    task.completedOn = Date.now();
    console.log("done this task")
  } catch (e) {}
};

module.exports = {
  getTasks,
  setTasks,
  editTask,
  deleteTask,
  countTasks,
  doneStatus
};
