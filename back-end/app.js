import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Router from './Router/router.js'

dotenv.config()



const app = express()



const port = process.env.port


// server port creating
app.listen(port, ()=>{
	console.log(`created connection`)
})


// connection to db
const db = process.env.mongodb
mongoose.connect(db).then(()=>{
	console.log('connected')
})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/create', Router);