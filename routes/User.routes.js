const express=require("express")
const {JsonWebToken}=require("jsonwebtoken")
const {UserModel}=require("../model/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try{
        bcrypt.hash(password,5,async(err, hash)=>{
            if(err) res.send({"msg":"Something went wrong","error":err.message})
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.send({"msg":"New Users has been registred"})
            }
        });
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})


userRouter.post("/login", async(req,res)=>{
    const {email,password}=(req.body)
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err, result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in","token":token})
                }else{
                    res.send({"msg":"wrong credentials"})
                }
            });
         }else{
            res.send({"msg":"wrong credentials"})
         }
        }catch(err){
            res.send({"msg":"Something went wrong","error":err.message})
        }
    })

    module.exports={
        userRouter
    }