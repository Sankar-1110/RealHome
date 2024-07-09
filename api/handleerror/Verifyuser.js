
import jwt from 'jsonwebtoken';
import { handleError } from './HandleError.js';

export const Verifyuser=(req,res,next)=>{

    
    const token=req.cookies.access_token;
    
    if(!token){
      
        console.log('No token provided');
        next(handleError(403,'Unauthorized:no token provided'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            console.log('Token verification failed:', err);
             return next(handleError(403,"Forbidden"))}
            req.user=user;
        next();
    })
}
