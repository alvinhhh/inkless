#!/bin/bash

echo "setup give me a sec pls kthxbye"

# 1. Setup backend
echo " setting up backend..."
mkdir -p inkless-mvp/server
cd inkless-mvp/server
npm init -y
npm install express cors body-parser
cd ../..

# 2. Setup frontend
echo " setting up frontend..."
mkdir -p inkless-mvp/client
cd inkless-mvp/client
npm init -y
npm install react react-dom react-scripts
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
cd ../..

echo " Setup complete! Next, run: ./start.sh"