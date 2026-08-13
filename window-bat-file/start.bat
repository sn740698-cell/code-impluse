@echo off
title Hackathon Servers

echo ========================================
echo       Starting Hackathon Project
echo ========================================
echo.

REM Start Django Backend
echo Starting Django backend...
start "Django Backend" cmd /k "cd /d D:\Hackathon\back-end && call venv\Scripts\activate.bat && python manage.py runserver"

REM Start React Frontend
echo Starting React frontend...
start "React Frontend" cmd /k "cd /d D:\Hackathon\front-end\frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo.
echo Django: http://127.0.0.1:8000
echo React:  http://localhost:5173
echo.
pause