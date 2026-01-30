import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config(); // use to load evironmental variable from .env file;

//async: a proframming pattern use that allow task to run concurrently without blocking the main excution thread

async function main(){
    await mongoose.connect(process.env.DB_KEY);
}

export default main;