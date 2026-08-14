@echo off
setlocal
title AI Career Compass Servers

set "PROJECT_ROOT=%~dp0.."
for %%I in ("%PROJECT_ROOT%") do set "PROJECT_ROOT=%%~fI"
set "BACKEND_DIR=%PROJECT_ROOT%\back-end"
set "FRONTEND_DIR=%PROJECT_ROOT%\front-end\frontend"

echo ========================================
echo       Starting Hackathon Project
echo ========================================
echo.

if not exist "%BACKEND_DIR%\.venv\Scripts\python.exe" (
  echo ERROR: Python virtual environment was not found at %BACKEND_DIR%\.venv
  echo Create it and install back-end\requirements.txt first.
  pause
  exit /b 1
)

if not exist "%FRONTEND_DIR%\node_modules" (
  echo Installing frontend dependencies...
  call npm --prefix "%FRONTEND_DIR%" install
  if errorlevel 1 (
    echo ERROR: Frontend dependency installation failed.
    pause
    exit /b 1
  )
)

REM Ensure the selected Django database is ready before starting either UI.
echo Applying backend migrations...
"%BACKEND_DIR%\.venv\Scripts\python.exe" "%BACKEND_DIR%\manage.py" migrate --noinput
if errorlevel 1 (
  echo ERROR: Django migrations failed. Check back-end\.env PostgreSQL settings.
  pause
  exit /b 1
)

echo Seeding initial demo data into database...
"%BACKEND_DIR%\.venv\Scripts\python.exe" "%BACKEND_DIR%\manage.py" seed_data

REM Start Django Backend
echo Starting Django backend...
start "Django Backend" cmd /k "cd /d \"%BACKEND_DIR%\" && .venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000"

REM Start React Frontend
echo Starting React frontend...
start "React Frontend" cmd /k "cd /d \"%FRONTEND_DIR%\" && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo.
echo Django: http://127.0.0.1:8000
echo React:  http://localhost:5173
echo.
pause
endlocal
