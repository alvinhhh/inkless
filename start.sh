#!/bin/bash

echo "starting backend bro"
cd inkless-mvp/server
node server.js &

echo "starting frontend (react dev server)"
cd ../client
npx react-scripts start

wait
echo "yeah it's done"