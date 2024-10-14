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