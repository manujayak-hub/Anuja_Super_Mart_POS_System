import mongoose from "mongoose";
import {logger} from "../utills/loggerfile"
import "dotenv/config"

let MONGO_URL = process.env.MONGO_URL

const MongoConnect = () => {
    mongoose.connect(MONGO_URL)
    .then(()=>{
        logger.info("DB connected Successfully")
    })
    .catch((err)=>{
        logger.error(err.message)
    })
} 

export default MongoConnect;