import { Router } from 'express';
import { identifyContact } from '../controllers/contact.controller'
const router = Router();

router.route('/identify')
    .post(identifyContact)

export default router;