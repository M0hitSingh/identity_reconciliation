import {Router, Request, Response} from 'express';
import contactRoute from './contact.route'

const router = Router();

// API routes
router.use("/", contactRoute);

// Not found handler - must be after all other routes
router.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
        status: 404
    });
});

export default router;
