#!/bin/bash

echo ""
echo "================================================"
echo "           Roxiler Systems Database Seeder"
echo "================================================"
echo ""
echo "Starting database seeding process..."
echo ""

cd backend
npm run seed

echo ""
echo "================================================"
echo "           Seeding Complete!"
echo "================================================"
echo ""
echo "You can now start the application:"
echo "  Backend: npm start (in backend folder)"
echo "  Frontend: npm run dev (in frontend folder)"
echo ""
echo "Check SEEDER_README.md for login credentials"
echo ""
