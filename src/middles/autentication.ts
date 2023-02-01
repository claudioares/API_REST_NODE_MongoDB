import UserListing from "../Users/UserListing";
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import { userToken } from "../Users/token";


const filterAutentication = async (req:Request, res:Response, next:NextFunction ) => {
    const { authorization } =req.headers;

    if(!authorization) return res.status(401).json({ message: "User not authorization!"})

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, userToken);

        const UserId = await UserListing.findById(id);
        if(!UserId) return res.status(401).json({message: "User not authorization!"});


        next();
    } catch (error) {
        return res.status(500).json({message: "Internal failure!"});
    }
}

export default filterAutentication;