import User from '../models/usermodal.js'
import bcryptjs from 'bcryptjs';
import { handleError } from '../handleerror/HandleError.js';
import jwt from 'jsonwebtoken';

export const signUp=async(req,res,next)=>{
    try{
   const{username,email,password}=req.body;
   const hashname= bcryptjs.hashSync(password,10);
   const response=new User({username,email,password:hashname});
   await response.save();
   res.status(201).json(response);
    }
    catch(error){
      console.log(error);
       next(error);
       
    }

}
export const signIn=async(req,res,next)=>{
  const {email,password}=req.body;
  try{
  const validuser=await User.findOne({email});
  if(!validuser){return next(handleError(404,'invalid user email'))}
  const validpass= bcryptjs.compareSync(password,validuser.password);
  if(!validpass){return next(handleError(401,'Wrong credentials'))}
  const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)
  const {password:pass,...rest}=validuser._doc;
  res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
}catch(error){
  console.log(error);
    next(error);
}
}
export const google=async(req,res,next)=>{
  try{
      const user=await User.findOne({email:req.body.email});
      if(user){
        if (user.avatar !== req.body.photo) {
          user.avatar = req.body.photo;
          await user.save();
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=user._doc;
       
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);          
      }
      else{
        const generatePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashpassword=bcryptjs.hashSync(generatePassword,10);
        const newuser= new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashpassword,avatar:req.body.photo})
       await newuser.save();
       const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET);
       const {password:pass,...rest}=newuser._doc;
       
       res.cookie('access_token',token,{httponly:true}).status(200).json(rest);
      }}catch(error){
       
        next(error);
      }
}
export const signOut=async(req,res,next)=>{
    try{
      res.clearCookie('access_token')
      res.status(200).json("User has been logged out!")
    
    }catch(error){
      next(error)
    }
}