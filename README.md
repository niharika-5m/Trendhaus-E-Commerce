# Trendhaus-E-Commerce
#  TrendHaus — Full Stack Fashion Discovery Platform

TrendHaus is a full-stack web application that combines **Pinterest-style visual discovery** with **e-commerce shopping**, allowing users to explore products and save them into personalized boards.

---

##  Features

###  Authentication
- User signup & login
- Password hashing using bcrypt
- JWT-based authentication

###  Products
- Fetch products from MongoDB
- Display products in a responsive grid

###  Boards (Core Feature)
- Create boards (like Pinterest)
- Save products to boards
- View saved items per user

###  Frontend
- Built with Next.js (App Router)
- Tailwind CSS for styling
- Dynamic data fetching from backend

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JWT (jsonwebtoken)
- bcryptjs

---

##  Project Structure
TrendHaus/
├── backend/
│ ├── server.js
│ ├── models (implicit in server)
│ └── .env
│
├── frontend/
│ ├── app/
│ │ ├── page.tsx # Home page (products)
│ │ ├── boards/
│ │ │ └── page.tsx # Boards page
│ │ └── login/
│ │ └── page.tsx # Login page
│ └── package.json

