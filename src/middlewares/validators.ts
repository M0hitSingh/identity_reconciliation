import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

const validateContact = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body?.email && !req.body?.phoneNumber) {
        next(new AppError('At least one of email or phoneNumber must be provided', 400));
        return;
    }
    if(req.body?.phoneNumber && typeof(req.body.phoneNumber) !== 'number') {
        next(new AppError('Phone number must be a Number', 400));
        return;
    }

    next();
}

export { validateContact };