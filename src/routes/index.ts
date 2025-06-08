import {Router, Request, Response} from 'express';
import contactRoute from './contact.route'

const router = Router();

// API routes
router.use("/", contactRoute);

export default router;
