# Bento Clone

A sophisticated clone of the Bento application, showcasing modern web development practices with a robust frontend and backend architecture.

![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Features

- **User Authentication**: Secure sign-up and login functionality using OAuth.
- **Responsive UI**: Adaptive design built with SCSS.
- **Dynamic Data**: API integration for real-time data updates.
- **Image Storage**: Utilizes Cloudinary for efficient and secure image storage.
- **Deployment**: Frontend seamlessly deployed on Vercel. Backend deployed on Render.

## Technologies Used

### Frontend

![NextJS](https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

---

## Why Supabase?

Supabase was chosen instead of MongoDB because it provides:

- **Postgres Foundation**: Built on PostgreSQL, offering relational data modeling and strong consistency.
- **Built-in Authentication**: Simplifies user management with OAuth, email, and third-party providers.
- **Real-time Subscriptions**: Enables live updates without complex socket implementations.
- **Scalability & Hosting**: Fully managed backend services with easy deployment and scaling.
- **Developer Experience**: Rich SDKs, dashboard, and seamless integration with modern frontend frameworks.

This makes Supabase a natural fit for projects requiring **secure authentication, real-time data, and structured relational storage**.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```sh
   git clone https://github.com/Harshrana123-coder/bento-clone.git


2. **Navigate to the project directory**

   ```sh
   cd bento-clone
   ```

3. **Install dependencies**
   - **Backend**
     ```sh
     cd backend
     npm install
     ```
   - **Frontend**
     ```sh
     cd frontend
     npm install
     ```

## Environment Variables

### Backend

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CLIENT_URL`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `PORT`
- `PASSWORD`
- `JWT_SECRET`
- `SESSION_SECRET`
- `COOKIE_KEY_1`
- `COOKIE_KEY_2`
- `ORIGIN_1`
- `ORIGIN_2`
- `ORIGIN_3`
- `ORIGIN_4`
- `NODE_ENV`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_FROM`

### Frontend

- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `NEXT_PUBLIC_API_URL`

## Setup

To run this project, create a `.env` file in the root directory for the backend and another `.env` file in the root directory for the frontend with the necessary environment variables listed above.

4. **Run the application**
   - **Backend**
     ```sh
     cd backend
     npm start
     ```
   - **Frontend**
     ```sh
     cd frontend
     npm start
     npm run dev
     ```

## Usage

Once the application is up and running, open your browser and navigate to:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Project Structure

```plaintext
bento-clone/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
├── .prettierrc
└── README.md
```
