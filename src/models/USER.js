import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    bio:{
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    nativeLanguage:{
        type: String,
        default: ""
    },
    learningLanguage:{
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: ""
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps:true})


const user = mongoose.model("User", userSchema);

//prehook
userSchema.pre("save", async(next)=>{

    if(!this.isModified("password")) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    } catch (error) {
        next(error);
    }
} )

export default user;