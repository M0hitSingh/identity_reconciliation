import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import { Contact } from '../config/db.config';
import { Contacts } from '../models/contact';
import { AppError } from '../utils/AppError';

// Define Contact interface
interface ContactInterface {
  id: string;
  email?: string;
  phoneNumber?: string;
  linkedId?: string;
  linkPrecedence: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const identifyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
      throw new AppError('Either email or phoneNumber must be provided.', 400);
    }

    // Fetch all contacts where email or phoneNumber matches
    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [
          email ? { email } : {},
          phoneNumber ? { phoneNumber } : {}
        ]
      },
      order: [['createdAt', 'ASC']]
    }) as unknown as ContactInterface[];

    let primaryContact = contacts.find((c: ContactInterface) => c.linkPrecedence === 'primary') || contacts[0];
    if (!primaryContact) {
      // Create new contact if none exist
      primaryContact = await Contact.create({ email, phoneNumber, linkPrecedence: 'primary' }) as unknown as ContactInterface;
      res.status(200).json({
        contact: {
          primaryContatctId: primaryContact.id,
          emails: [primaryContact.email].filter(Boolean),
          phoneNumbers: [primaryContact.phoneNumber].filter(Boolean),
          secondaryContactIds: []
        }
      });
      return;
    }

    const secondaryContacts = contacts.filter(c => c.id !== primaryContact.id);
    const isNewEmail = email && !contacts.some(c => c.email === email);
    const isNewPhone = phoneNumber && !contacts.some(c => c.phoneNumber === phoneNumber);
    console.log(isNewEmail, isNewPhone)
    if (isNewEmail || isNewPhone) {
      const newSecondary = await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary'
      }) as unknown as ContactInterface;
      secondaryContacts.push(newSecondary);
    }

    const allContacts = [primaryContact, ...secondaryContacts];
    const emails = [...new Set(allContacts.map(c => c.email).filter(Boolean))];
    const phoneNumbers = [...new Set(allContacts.map(c => c.phoneNumber).filter(Boolean))];
    const secondaryContactIds = secondaryContacts.map(c => c.id);

    res.status(200).json({
      contact: {
        primaryContatctId: primaryContact.id,
        emails,
        phoneNumbers,
        secondaryContactIds
      }
    });
  } catch (err: any) {
    console.log(err)
    next(new AppError(err?.message || 'Internal Server Error', 500));
  }
};
