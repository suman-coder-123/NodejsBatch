
const jwt = require("jsonwebtoken");
const User = require ("../models/User");
const bcrypt = require("bcryptjs");

 


const registerUser = async (req , res) => {
    try {
        const {name , email , password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success : false ,
                message : "please provide all field"
            });
        }

        const existingUser = await User.findOne({email});

         if (existingUser) {
            return res.status(400).json({
                success : false ,
                message : "user already exists"
            });
         }

         const hashedPassword = await bcrypt.hash(password , 10);
         const user = await User.create({
            name , 
            email ,
            password : hashedPassword
         });

         res.status(201).json({
            success : true,
            message : "user registration successfully"
         });
    } catch (error){
        res.status(500).json({
            success : false ,
            message : error.message
        });
    }
};


const loginUser = async (req , res) => {
    try {
        const {email , password} = req.body;


        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({
                success: false ,
                message : "invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare( password , user.password);

        if (!isMatch) {
            return res.status(401).json({
                success : false ,
                message : "invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id : user_id,
                role : user.role
            },

            process.env.JWT_SECRET, {
                expriesIn : process.env.JWT_SECRET_IN || "1d"
            }
        );

        res.status(200).json({
            success : true,
            message : "login successfully",
            token
        });
    } catch (error) {
        res.status(500).json({
            success : false ,
            message : error.message
        });
    }
};

module.exports = {registerUser , loginUser };