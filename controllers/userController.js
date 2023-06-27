const  asyncHandler =require("express-async-handler");
const bcrypt = require("bcrypt");
const User =require("../models/userModel");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js")
const { decrypt } = require("dotenv");

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandotary!");
    }
    const userAvilable = await User.findOne({email});
    console.log(userAvilable, '-------')
    if(userAvilable){
        res.status(400);
        throw new Error("user already registerd ");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log("Hashed password:", hashedPassword );
    const user = User.create({
        username,email,password: hashedPassword,
    });

    console.log(`User created ${User}`);
    if(User){
        res.status(201).json({_id:User.id,email:User.email});
    }
    else{
        res.status(400);
        throw new Error ("User data us not valid");
    }
    res.json({message:"Register the user"});
});

const loginUser = asyncHandler(async (req,res)=>{
    try {
        const{email,password} = req.body;
        if(!email || !password){
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        console.log(email, '==============')
        const user = await User.findOne({'email': email});
        console.log(user,'-------------->', (await bcrypt.compareSync(password, user.password)))
        if(user && (await bcrypt.compareSync(password, user.password))){
            const accessToken = jwt.sign({
                user:{
                    username:user.username,
                    emial:user.email,
                    id:user.id, 
                },
            },process.env.ACCESS_TOKEN_SECERT,
            {expiresIn:"15m"}
            );
            return res.status(200).json({accessToken});
        }
    } catch (err) {
        console.log(err, 'errrrrrrrrr')
        return
    }
});

const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user );
});

module.exports = {registerUser,loginUser,currentUser};