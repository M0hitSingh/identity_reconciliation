import { Router } from 'express';
import { identifyContact } from '../controllers/contact.controller';
import { validateContact } from '../middlewares/validators';

const router = Router();

router.post('/identify', validateContact, identifyContact);

export default router;
