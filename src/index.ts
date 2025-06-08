import express from 'express';
import dotenv from 'dotenv'
import {connectDB} from './config/db.config'
import router from './routes'

const app = express();
app.use(express.json());
dotenv.config();

// Register API routes
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`:::::::::::::::::::: Server is running on port ${PORT} ::::::::::::::::::::`);
});

export default app;