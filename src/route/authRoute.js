import express from "express";

const router = express.Router();

router.get("/signin", (req,res)=>{
    res.send("Sign in");
})

router.get("/signup", (req,res)=>{
    res.send("signup");
})

router.get("/signout", (req,res)=>{
    res.send("signout");
})

export default router