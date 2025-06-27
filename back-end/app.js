import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()



const app = express()



const port = process.env.port





// server port creating
app.listen(port, ()=>{
	console.log(`created connection`)
})


// connection to db