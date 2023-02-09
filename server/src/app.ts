import express,{ type Response, type Request } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import homeRoutes from '@routes/homeRoutes'
import userRoutes from '@routes/userRoutes'

require("dotenv").config();


class App {
    public app: express.Application

    public constructor(){
        this.app=express()

        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares (): void {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private database():void{
        //PERCENT ENCODING PASS
        if(process.env.MONGO_URI){
            mongoose.connect(process.env.MONGO_URI)
            .then(()=> {
                console.log('Database connection success')
                this.app.emit('Done')
            })
        }else{
            console.log("Need to set database configuration in the application")
        }
    }

    private routes(): void{
        this.app.use('/', homeRoutes)
        this.app.use('/users', userRoutes)
    }
}


export default new App().app