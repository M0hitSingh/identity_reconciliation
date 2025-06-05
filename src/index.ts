import express from 'express';
import dotenv from 'dotenv'
import {connectDB} from './config/db.config'

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    connectDB();
    console.log(`:::::::::::::::::::: Server is running on port ${PORT} ::::::::::::::::::::`);
});

export default app;