import {Router} from 'express';
import contactRoute from './contact.route'
const router = Router();

router.use("/",contactRoute);

export default router;
