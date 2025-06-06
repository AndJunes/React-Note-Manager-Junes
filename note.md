## Technologies

- **Frontend**

  - React (v19)
  - Vite
  - TailwindCSS
  - React Router DOM
  - React Hook Form + Zod for validation
  - Axios for HTTP requests
  - js-cookie for cookie handling
  - Day.js for date manipulation
  - @headlessui/react, @heroicons/react, react-icons

- **Backend**
  - Node.js (ESM)
  - Express
  - Prisma ORM (v6.9)
  - SQLite (local `dev.db` file)
  - bcryptjs for password hashing
  - jsonwebtoken for JWT generation and verification
  - cookie-parser for cookie handling
  - dotenv for environment variables
  - Zod for schema validation
  - Morgan for HTTP request logging
  - CORS

---

## Requirements

- **Node.js & npm**

  - Recommended Node.js version: 18+.
  - npm (v9+) or yarn/pnpm (any package manager is fine, though npm is used by default).

- **Git** (to clone the repository)
- **Internet Connection** (to install dependencies)

---

## Project Structure

```plain
react-notes/
├── start.sh
├── .gitignore
├── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── ...
└── backend/
    ├── prisma/
    │   ├── schema.prisma
    │   └── dev.db
    ├── src/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── routes/
    │   ├── services/
    │   ├── repositories/
    │   └── index.js
    ├── .env
    ├── package.json
    └── ...
```

##Installation and Setup

1. Clone the repository:
   -git clone https://github.com/AndJunes/React-Note-Manager-Junes.git
2. Run the startup script:
   ./start.sh
