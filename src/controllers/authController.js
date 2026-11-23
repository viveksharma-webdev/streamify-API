import User from "../models/USER.js"
import jwt from "jsonwebtoken"

export const signup = async (req,res)=>{
    const {email, password, fullName} = req.body

    try {
        
        if(!fullName || !email || !password) return res.status(400).json({message: "All fields are required"})
        
        if(password.length < 8) return res.status(400).json({message: "Password should be at least 8 characters"})

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if(!emailRegex.tett(email)) return res.status(400).json({message: "Invalid email format"})

        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({message: "User already Exist"})
        
        const idx = Math.floor(Math.random()*100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = new User.create({
            email : email,
            fullName : fullName,
            password : password,
            profilePic : randomAvatar
        })

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, { expiresIn: "7d"})

        res.cookie("jwt", token, {maxAge: 7*24*60*60*1000, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production"})

        res.status(201).json({success: true, user:newUser})

    } catch (error) {
        console.log("Error in signUp", error)
        res.status(500).json({message:" Internal Server Error"})
    }
}

export const signin = async (req,res)=>{
    res.send("Sign in")
}

export const signout = async (req,res)=>{
    res.send("Sign out")
}

