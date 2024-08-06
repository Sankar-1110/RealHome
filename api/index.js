import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import listingRouter from './routes/listing.route.js'
import path from 'path';
dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.URI).then(()=>{
    console.log("database connected succesfully");
    app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");})
})
app.use("/api/auth",authRouter);   
app.use("/api/user",userRouter);    
app.use("/api/listing",listingRouter); 

app.use(express.static(path.join(path.resolve(), 'my-project/dist')));

// Anything that doesn't match the API routes should be handled by the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'my-project','dist', 'index.html'));
});

app.use((err,req,res,next)=>{
    const message=err.message || "internal error"
    const statuscode= err.statuscode||500
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
  

})
