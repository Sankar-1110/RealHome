import express from "express";
 const router=express.Router();
 import { signOut, signUp } from "../controller/auth.controller.js";
 import { signIn } from "../controller/auth.controller.js";
 import { google } from "../controller/auth.controller.js";

router.post("/signup",signUp);
router.post("/signin",signIn);
router.post("/google",google);
router.get("/signout",signOut);


export default router;
