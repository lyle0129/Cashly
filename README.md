# Cashly

Cashly is a cross-platform wallet & expense tracking web application (with companion mobile support) built with modern technologies. It supports authenticated user accounts, transaction management (with date filtering), and is styled responsively for both desktop and mobile screens.

# NOTE: a new release (CASHLY 2.0) is out with updated features and technologies.  

[Live Web App](https://cashly-2-0.vercel.app/)  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Setup Backend](#setup-backend)  
  - [Setup Frontend](#setup-frontend)  

---

## Features

- User authentication / registration (via **Clerk**)  
- CR_D operations on user transactions (income, expenses, etc.)  
- Filtering / querying transactions by date ranges  
- Responsive UI (desktop & mobile friendly)  
- Secure backend API (Express.js)  
- PostgreSQL (via **NeonDB**) for data persistence  
- Raw SQL queries (no ORM)  
- Frontend built with **React** + **Tailwind CSS**  

---

## Tech Stack

| Layer | Technology / Tool |
|---|---|
| Backend | Node.js, Express.js |
| Auth / User Management | Clerk |
| Database | PostgreSQL (NeonDB) |
| Querying | Raw SQL (no ORM) |
| Frontend | React.js + Tailwind CSS |
| Hosting / Deployment | Backend on Render, Frontend on Vercel |

---

### Prerequisites

- Node.js (v16+ recommended)  
- pnpm / npm / yarn  
- Access to NeonDB PostgreSQL instance  
- Clerk API & frontend / backend keys  
- (Optional) Postman / HTTP client for testing APIs  

### Setup Backend

1. Clone the repo (if not already)  
   ```bash
   git clone https://github.com/lyle0129/Cashly.git
   cd Cashly/backend
   npm install
   
2. Configure environment variables (see next section)

3. Run migrations / initialize DB (if applicable)

4. Start server (in dev mode)
   ```bash
   npm run dev
5. The backend should now listen (e.g. http://localhost:5001 or your configured port)

### Setup Frontend

1. Move to the webapp directory
    ```bash
   cd ../
2. Clone the repo (if not already)  
   ```bash
   git clone https://github.com/lyle0129/Cashly.git
   cd Cashly/webapp
   npm install
3. Add environment variables (e.g. Clerk frontend key, backend API URL)

4. Run development server
   ```bash
   npm run dev
5. Access via http://localhost:5173 (or your configured port)
