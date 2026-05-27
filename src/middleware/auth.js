

const jwt = require("jsonwebtoken");

const Useer=require("../models/user");

const profileauth= async (req,res,next)=>{
    try {
        const readcookie=req.cookies;
    const {token}=readcookie;
    if(!token){
        throw new Error("token not found");
        

    }
    const verifyToken= await jwt.verify(token,"DEVtinder@123");
    const {_id}=verifyToken;
    const user= await Useer.findById(_id);
    if(!user){
        throw new Error("user not found");
        
    }
    req.user=user; 
    next();

        
    } catch (error) {
        res.status(404).send("error is there");
        
    }
};
module.exports={
    profileauth
}