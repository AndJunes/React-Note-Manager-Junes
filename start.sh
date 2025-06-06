#!/bin/bash

set -e  # Detiene la ejecución si ocurre un error

echo "📁 Starting full stack setup for React Notes..."

# 1. Configuración del Frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# 2. Configuración del Backend
cd ../backend
echo "📦 Installing backend dependencies..."
npm install

# 3. Verificar y crear .env si no existe
if [ ! -f ".env" ]; then
  echo "⚙️ Creating .env file..."
  cat <<EOT >> .env
DATABASE_URL="file:./dev.db"
TOKEN_SECRET="some_super_secret_key"
EOT
else
  echo "ℹ️ .env already exists, skipping creation."
fi

# 4. Ejecutar migraciones de Prisma
echo "🛠️ Running Prisma migrations..."
npx prisma migrate dev --name init

# 5. Volver a la raíz del proyecto
cd ..

# 6. Verificar si `concurrently` está instalado, si no instalarlo
if ! command -v concurrently &> /dev/null; then
  echo "⚠️ concurrently not found. Installing globally..."
  npm install -g concurrently
fi

# 7. Iniciar Frontend y Backend
echo "🚀 Launching both servers..."
concurrently "npm --prefix backend run dev" "npm --prefix frontend run dev"
