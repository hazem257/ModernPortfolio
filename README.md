# Personal Portfolio Web App

A modern, responsive personal portfolio built with **React** for the frontend and **NestJS** for the backend. The project showcases my **certificates, projects, and contact form**, all powered by a clean **REST API**.

---

## Frontend Features
- Interactive **certificate cards** with Parallax, Glassmorphism, and shine effects
- Smooth animations with **Framer Motion**
- Fully **responsive layout** for desktop and mobile
- **Dark mode** support with dynamic theme switch
- Optimized for performance and accessibility

---

## Backend Features
- **NestJS REST API** serving certificates, projects, and contact submissions
- **Type-safe DTOs** and validation for robust data handling
- Secure endpoints and efficient database queries (MongoDB/PostgreSQL)

---

## Tech Stack
**Frontend:** React, TailwindCSS, Framer Motion, TypeScript  
**Backend:** NestJS, Node.js, Express, TypeScript, MongoDB/PostgreSQL  

---

## Example API Response (Certificates)

```json
[
  {
    "id": 1,
    "title": "React Advanced",
    "company": "Udemy",
    "hour": "12h",
    "date": "2025-01-10",
    "imageUrl": "https://via.placeholder.com/300x180"
  },
  {
    "id": 2,
    "title": "NestJS Basics",
    "company": "Coursera",
    "hour": "15h",
    "date": "2025-02-20",
    "imageUrl": "https://via.placeholder.com/300x180"
  }
]
