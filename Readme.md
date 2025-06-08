# Identity Reconciliation Service

A backend service to reconcile and unify contact data using email and phone number. The service identifies existing contacts, creates primary or secondary contact relationships, and returns a consolidated view of a contact.

---

## Tech Stack

- **Node.js** – Server-side JavaScript runtime
- **Express** – Web framework for API handling
- **Sequelize** – ORM for PostgreSQL
- **PostgreSQL** – Relational database

---

## Features

- Accepts contact info (email and/or phone number)
- Detects existing contacts in the system
- Identifies or creates a **primary contact**
- Links related contacts as **secondary contacts**
- Returns a unified profile with all related data

---

##  API Endpoint

### `POST /identify`

**Request Body:**
```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```
## Hosted URL
Service is hosted and accessible at:

https://identity-reconciliation-sr44.onrender.com/identify