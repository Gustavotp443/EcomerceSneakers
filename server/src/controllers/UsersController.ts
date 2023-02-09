import {type Response, type Request} from 'express'

import User from '@models/User'

class UserController{
    public async index(req:Request,res:Response):Promise<Response>{
        const users= await User.find()
        
        return res.json(users)
    }

    public async store(req:Request,res:Response):Promise<Response>{
        try{
            const newUser= await User.create(req.body)

            return res.json({
                user:newUser
            })
        }catch(e){
            return res.status(400).json({
                error:e.message
            })
        }
        
    }
}


export default new UserController()