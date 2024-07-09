import express from "express";

import { test,Updateuser ,Deleteuser, getUserListing, getUser} from "../controller/user.controller.js";
import { Verifyuser } from "../handleerror/Verifyuser.js";

 const router=express.Router();

 router.get('/test', test);
router.post('/update/:id',Verifyuser,Updateuser);
router.delete('/delete/:id',Verifyuser,Deleteuser);
router.get('/listing/:id',Verifyuser,getUserListing);
router.get('/:id',Verifyuser,getUser);


export default router;
