const mongoose = require("mongoose");
const User = require("./user");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  DOS: {
    type: Date,
    // required: true,
    default: Date.now(),
  },
  DOE: {
    type: Date,
    // required: true,
    default: Date.now(),
  },
  natureOfTask:{
    type:String,
    required:true
  },
  status: {
    type: String,
    enum:["pending","completed","inprogress"],
    default:"pending",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;