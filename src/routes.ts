import { Router, Request, Response } from 'express';
import UserController from './Controllers/UserController';
import filterAutentication from './middles/autentication';

export const routes = Router();

routes.get('/healt', (req:Request, res:Response)=>{
    
    return res.status(200).json({message: "Server is on.."})
})

routes.post('/sign', UserController.create)
routes.post('/login', UserController.login)

routes.use(filterAutentication);
routes.post('/addclient', UserController.addClient)
routes.get('/listing', UserController.listing)
routes.get('/listing/:id', UserController.listingUser)
routes.put('/update/:id', UserController.update)
routes.delete('/delete/:id', UserController.delete)