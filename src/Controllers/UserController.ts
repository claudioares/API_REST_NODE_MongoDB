import UserListing from '../Users/UserListing';
import {Request, Response} from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { userToken } from '../Users/token';

class UserController {
    async create (req:Request, res:Response){
        try {
            const {username, email, password} = req.body;
            const userAlreadyExists = await UserListing.findOne({username:username});
            const emailAlreadyExists = await UserListing.findOne({email:email});
            
            if(userAlreadyExists) {
                return res.status(400).json({message: "This username already exists!"});
            }
            if(emailAlreadyExists) return res.status(400).json({message: "This Email already exists!"});

            console.log('passou por aqui')
            if(!username || !email || !password) return res.status(400).json({message: "All parameters required"})

            const cryptPassword = await bcrypt.hash(password, 10)


           await UserListing.create({
                username,
                email,
                password:cryptPassword
            })
            
            return res.status(201).json({
                username, 
                email
            })

        } catch (error) {
                return res.status(404).json({message: "Failed to create user!"});
        }
    }

    async login (req:Request, res:Response) {
        try {
            const { username, password } = req.body;


            if(!username || !password) return res.status(400).json({message: "All parameters required"});

            const user = await UserListing.findOne({username})
            if(user === null) return res.status(400).json({ message: "User not foud!"})

            const { _id, username:userName, email:emailUser } = user;

            const toCompare = await bcrypt.compare(password, user.password);
            if(!toCompare) return res.status(400).json({ messagem: 'Failed validetion!'})

            const token = jwt.sign({id: user._id}, userToken, { expiresIn: '8h' })

            return res.status(200).json({
                _id,
                userName,
                emailUser,
                token
            })

        } catch (error) {
            return res.status(404).json({message: "Failed to login users!"});
        }
    }

    async addClient (req:Request, res:Response ){
        try {
            const {username, email, phone, street, number, cpf, city, country} = req.body;
            if(!username || !email || !phone || !street || !number || !cpf || !city || !country) return res.status(400).json({message: "All parameters required"});

            const userAlreadyExists = await UserListing.findOne({email:email});
            if(userAlreadyExists) return res.status(400).json({message: "This email already exists!"});

            const createUser = await UserListing.create({
                username,
                email,
                phone,
                street,
                number,
                cpf,
                city,
                country
            })

            return res.status(201).json({createUser})
            
        } catch (error) {
            return res.status(404).json({message: "Failed to Add user!"});
        }
    }

    async listing (req:Request, res:Response) {
        try {
            const listingUser = await UserListing.find();

            return res.status(200).json(listingUser)

        } catch (error) {
            return res.status(404).json({message: "Failed to list users!"});
        }
    }

    async listingUser (req:Request, res:Response) {
        try {
            const { id } = req.params;
            const listingUserId = await UserListing.findById(id);
            if(!listingUserId) return res.status(404).json({message: "User not foud!"});
    
            return res.status(200).json(listingUserId);

        } catch (error) {
            return res.status(404).json({message: "Failed to list user!"});
        }
    }

    async update (req:Request, res:Response) {
        try {
            const { id } = req.params;
            const {email} = req.body;

            const userAlreadyExists = await UserListing.findOne({email:email});

            if(userAlreadyExists) return res.status(400).json({message: "This email already exists!"});
            if(!id) return res.status(404).json({message: "Verify user all params"});

            await UserListing.findByIdAndUpdate(id, req.body)
          

            return res.status(200).json({message: "User updated"});

        } catch (error) {
            return res.status(404).json({message: "Failed to update user!"});
        }
    }

    async delete (req:Request, res:Response) {
      try {
        const { id  } = req.params;
        if(!id) return res.status(404).json({message: "Verify user all params"});

        const deleteUser = await UserListing.findByIdAndDelete(id)
        if(!deleteUser) return res.status(404).json({message: "User does not exists"})

        return res.status(200).json({message: "User deleted"});

      } catch (error) {
        return res.status(404).json({message: "Failed to delete user!"});
      }
    }
}

export default new UserController;