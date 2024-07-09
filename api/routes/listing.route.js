import express from "express";
import { createListing, deleteListing, getListing, getListings, updateListing } from "../controller/listing.controller.js";
import { Verifyuser } from "../handleerror/Verifyuser.js";

 const router=express.Router();

 router.post('/create',Verifyuser,createListing);
router.delete('/delete/:id',Verifyuser,deleteListing);
router.post('/update/:id',Verifyuser,updateListing);
router.get('/get/:id',getListing);
router.get('/get',getListings);

export default router;
