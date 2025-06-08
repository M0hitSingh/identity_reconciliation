import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import {connectDB} from './config/db.config'
import router from './routes'

const app = express();
app.use(express.json());
dotenv.config();

// Register API routes
app.use('/', router);

// Not Found Handler
app.use((req: Request, res: Response, next: Function) => {
    const error = {
      status: 404,
      error: 'Not Found',
      message: `Cannot ${req.method} ${req.originalUrl}`
    };
    res.status(404).json(error);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`:::::::::::::::::::: Server is running on port ${PORT} ::::::::::::::::::::`);
});

export default app;