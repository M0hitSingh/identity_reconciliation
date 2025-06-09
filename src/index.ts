import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import {connectDB} from './config/db.config'
import router from './routes'
import { errorHandler } from './middlewares/error.middleware';
import { AppError } from './utils/AppError';

const app = express();
app.use(express.json());
dotenv.config();

// Register API routes
app.use('/', router);

// Welcome route
app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Identity Reconciliation API</h1> <p>Use the /identify endpoint to identify a contact</p>");
});

// Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(`Cannot ${req.method} ${req.originalUrl}`, 404);
    next(error);
});

// Error handling middleware (must be last)
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`:::::::::::::::::::: Server is running on port ${PORT} ::::::::::::::::::::`);
});

export default app;