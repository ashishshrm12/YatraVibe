// import User from "../models/User.js";
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export const register=async(req,res)=>{
//     try {
//         const newUser=new User({
//             username:req.body.username,
//             email:req.body.email,
//             password:req.body.password,
//             photo:req.body.photo
//         });

//         await newUser.save()

//         res.status(200).json({
//             sucess:true, 
//             message:'Successfully created',
//         });
//     } catch (err) {
//         res.status(500).json({
//             sucess:false,
//             message:'Failed to create. Try again'})
//     }
// };
// export const login=async(req,res)=>{
//     try {
        
//     } catch (err) {
        
//     }
// };

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import auth form

// Register
export const register = async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
      }
  
      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        photo: req.body.photo,
      });
  
      await newUser.save();
  
      res.status(200).json({ success: true, message: "Successfully created" });
    } catch (err) {
      console.error("Error creating user:", err);  // Log the error
      res.status(500).json({ success: false, message: "Failed to create. Try again" });
    }
  };
  

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Sign JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // You can add more fields if needed
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    const { password: _, ...userData } = user._doc; // remove password from response
   
    res.status(200).json({
      success: true,
      token,
      message: "Successfully logged in",
      data: userData,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
