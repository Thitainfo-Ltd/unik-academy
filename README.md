# UNIK Academy - Next.js Application

A modern, responsive web application for UNIK Academy built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB.

## Features

- 🎨 Modern, responsive design with custom color scheme
- 📱 Mobile-friendly navigation
- 🏠 Home page with course pricing and core courses
- 📖 About Us page
- 💼 Careers/Hiring page with application form
- 📧 Contact page with contact form
- 📄 Terms and Conditions page
- 🔐 Admin panel for managing contacts and applications
- 🗄️ MongoDB integration for data storage
- ⚡ Built with Next.js 15 App Router

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB with Mongoose
- **Authentication:** Custom admin authentication

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)

### Installation

1. Clone the repository or navigate to the project directory:

   ```bash
   cd unik-academy
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy `.env.local.example` to `.env.local`
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `ADMIN_SECRET_KEY` with a secure secret key

   ```bash
   cp .env.local.example .env.local
   ```

4. Create an admin user:

   ```bash
   # Make a POST request to /api/admin/create-admin
   # Or use a tool like Postman/curl:
   curl -X POST http://localhost:3000/api/admin/create-admin \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"yourpassword","secretKey":"unik-admin-secret-2025"}'
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
unik-academy/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API routes
│   │   ├── about/          # About Us page
│   │   ├── careers/        # Careers/Hiring page
│   │   ├── contact/        # Contact page
│   │   ├── terms/          # Terms and Conditions page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── not-found.tsx   # 404 error page
│   ├── components/         # React components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── lib/               # Utility functions
│   │   └── mongodb.ts     # MongoDB connection
│   └── models/            # Mongoose models
│       ├── Contact.ts
│       ├── Application.ts
│       └── Admin.ts
├── .env.local             # Environment variables
└── package.json
```

## Color Scheme

- **Primary Dark:** `#0e2b49`
- **Primary Medium:** `#133a67`
- **Accent Gold:** `#c0a84f`

## Pages

- **Home (`/`):** Main landing page with course pricing and core courses
- **About Us (`/about`):** Information about UNIK Academy
- **Careers (`/careers`):** Job openings and application form
- **Contact (`/contact`):** Contact form and contact information
- **Terms (`/terms`):** Terms and conditions
- **Admin Login (`/admin/login`):** Admin authentication
- **Admin Dashboard (`/admin/dashboard`):** Admin panel for managing data

## API Routes

- `POST /api/contact` - Submit contact form
- `POST /api/application` - Submit job application
- `POST /api/auth/login` - Admin login
- `GET /api/admin/contacts` - Get all contact messages (admin only)
- `GET /api/admin/applications` - Get all job applications (admin only)
- `POST /api/admin/create-admin` - Create admin user (requires secret key)

## Database Models

- **Contact:** Stores contact form submissions
- **Application:** Stores job application submissions
- **Admin:** Stores admin user credentials

## Deployment

1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Update `MONGODB_URI` in your deployment environment
3. Deploy to Vercel, Netlify, or your preferred hosting platform
4. Create an admin user using the create-admin endpoint

## Contact Information

- **Email:** unikacademy2025@gmail.com
- **Phone:** 9217196824

## License

Private - UNIK Academy
