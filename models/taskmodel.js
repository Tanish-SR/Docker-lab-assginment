const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskTitle: {
        type: String,
        required: [true, "Task title is required"]
    },
    taskDesc: {
        type: String,
        required: [true, "Task Desc is required"]
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;