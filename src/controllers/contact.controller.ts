import { Request, Response } from 'express';
import { Contact } from '../config/db.config';
import { Contacts } from '../models/contact';

// Helper function to find or create a secondary contact
const findOrCreateSecondary = async (newContactInfo: { email?: string; phoneNumber?: string }, primaryId: number) => {
  if (newContactInfo.email || newContactInfo.phoneNumber) {
    const secondaryContact = await Contact.findOne({
      where: {
        email: newContactInfo.email,
        phoneNumber: newContactInfo.phoneNumber,
        linkedId: primaryId
      }
    });

    if (!secondaryContact) {
      await Contact.create({
        ...newContactInfo,
        linkedId: primaryId,
        linkPrecedence: 'secondary'
      });
    }
  }
};

const identifyContact = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    res.status(400).json({ error: 'At least one of email or phoneNumber must be provided' });
    return;
  }
  let primaryContact: typeof Contacts | any = null;
  let secondaryContacts: any = [];


  // Find the primary contact if it exists
  if (email) {
    primaryContact = await Contact.findOne({ where: { email, linkPrecedence: 'primary' } });
    if (!primaryContact) {
      primaryContact = await Contact.findOne({ where: { email, linkPrecedence: 'secondary' } });
      if (primaryContact) {
        secondaryContacts = await Contact.findAll({ where: { linkedId: primaryContact.id, linkPrecedence: 'secondary' } });
      }
    }
  }

  if (phoneNumber) {
    const phoneContact: any = await Contact.findOne({ where: { phoneNumber } });
    if (phoneContact) {
      if (!primaryContact) {
        primaryContact = phoneContact;
      } else if (phoneContact.id !== primaryContact.id) {
        primaryContact = await Contact.findOne({ where: { id: phoneContact.linkedId } });
        if (primaryContact) {
          secondaryContacts.push(phoneContact);
        }
      }
    }
  }

  if (!primaryContact) {
    // Create new primary contact
    primaryContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: 'primary'
    });
    res.status(200).json({
      contact: {
        primaryContatctId: primaryContact.id,
        emails: email ? [email] : [],
        phoneNumbers: phoneNumber ? [phoneNumber] : [],
        secondaryContactIds: []
      }
    });
    return;
  }

  await findOrCreateSecondary({ email, phoneNumber }, primaryContact.id);
  secondaryContacts = await Contact.findAll({ where: { linkedId: primaryContact.id, linkPrecedence: 'secondary' } });

  res.status(200).json({
    contact: {
      primaryContatctId: primaryContact.id,
      emails: [primaryContact.email, ...secondaryContacts.map((c: { email: any; }) => c.email).filter(Boolean)],
      phoneNumbers: [primaryContact.phoneNumber, ...secondaryContacts.map((c: { phoneNumber: any; }) => c.phoneNumber).filter(Boolean)],
      secondaryContactIds: secondaryContacts.map((c: { id: any; }) => c.id)
    }
  });
}

export {
  identifyContact
}