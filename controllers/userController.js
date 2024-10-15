const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const saltRounds = 10;
exports.register = async (req,res) => {
    try{
        // const newUser = await User.create(req.body);
        const {userName, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            userName,
            email,
            password: hashPassword
        }); 
        res.status(201).json({
            status: "user Successfully created",
            data: {
                user: newUser
            }
        });
    }catch(err){
        res.status(401).json({
            status: "failed to register user"
        });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            count: users.length,
            data: {
                users
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to get user list",
            message: e.message
        });
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to get user details",
            message: e.message
        });
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const { password } = req.body;

        // Hash the new password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Find the user by ID and update their password
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { password: hashPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Password updated successfully",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to update password",
            message: e.message
        });
    }
};

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.findOne({email});
        if(!user) {
            res.status(404).json({
                status: "failed",
                message: "Invalid Email Address"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            res.status(200).json({
                status: "Success",
                data: {
                    user:user.userName,
                    email: email
                }
            })
        }else{
            res.status(404).json({
                stauts:"Failed",
                message: "Invalid Password"
            });
        }
    }catch(err){
        res.status(400).json({
            status: "failed to fetch"
        })
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to delete user",
            message: e.message
        });
    }
};
