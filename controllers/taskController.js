const Task = require('../models/taskmodel');

exports.createTask = async(req,res,next) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                task
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "Failed to create task"
        })
    }
}
exports.getAllTask = async(req,res,next) => {
    try {
        const taskList = await Task.find();
        res.status(200).json({
            status: "success",
            count: taskList.length,
            data: {
                taskList
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "Failed to get All Tasks"
        })
    }
}
exports.getOneTask = async(req,res,next) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                task
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "Failed to get One Task"
        });
    }
}

exports.updateTasks = async(req,res,next) => {
    try{
        const Tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: {
                Tasks
            }
        })
    }catch(err){
        res.status(400).json({
            status: "failed to update task"
        });
    }
}

exports.deleteTasks = async(req,res,next) => {
    try{
        const Tasks = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "task deleted success"
        })  
    }catch(err){
        res.status(400).json({
            status: "failed to deleted task"
        });
    }
}