import path from "path"
import express from 'express'
import Router from './routes/index.js'
import {port,NODE_ENV} from './config/index.js'
import cors from "cors"
const app = express()
const __dirname = path.resolve();

app.use(cors({
    
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if(NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, "..", "build")));
    app.use(express.static("public"));
}

app.use("/", Router)

app.listen(port, () => {
    console.log(`Server is Running at port : ${port}`)
})