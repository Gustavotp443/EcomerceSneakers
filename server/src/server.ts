import express, {Response, Request} from "express";

const app = express();

app.get('/', (req:Request, res:Response)=>{
    return res.json({message:"Hello World"})
})

const port = 3333
app.listen(port, ()=>{
  console.log(`Listen in ${port}`)
  console.log(`CTRL + Click -> http://localhost/${port}`)
})