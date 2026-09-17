@echo off
setlocal enabledelayedexpansion
title AI Career Compass Servers Launcher

set "PROJECT_ROOT=%~dp0"
if "%PROJECT_ROOT:~-1%"=="\" set "PROJECT_ROOT=%PROJECT_ROOT:~0,-1%"
set "BACKEND_DIR=%PROJECT_ROOT%\back-end"
set "FRONTEND_DIR=%PROJECT_ROOT%\front-end\frontend"

echo ========================================================
echo       Starting AI Career Compass Full-Stack App
echo       Django Backend + React Vite Frontend
echo ========================================================
echo.

REM 1. Detect Python Virtual Environment
set "PYTHON_EXE="
if exist "%BACKEND_DIR%\venv\Scripts\python.exe" (
    set "PYTHON_EXE=%BACKEND_DIR%\venv\Scripts\python.exe"
) else if exist "%BACKEND_DIR%\.venv\Scripts\python.exe" (
    set "PYTHON_EXE=%BACKEND_DIR%\.venv\Scripts\python.exe"
) else (
    set "PYTHON_EXE=python"
)

echo [1/4] Using Python executable: %PYTHON_EXE%

REM 2. Check Backend Dependencies
"%PYTHON_EXE%" -c "import dotenv, django, rest_framework" >nul 2>&1
if errorlevel 1 (
    echo Installing backend dependencies from requirements.txt...
    "%PYTHON_EXE%" -m pip install -r "%BACKEND_DIR%\requirements.txt"
    if errorlevel 1 (
        echo ERROR: Backend dependency installation failed.
        pause
        exit /b 1
    )
)

REM 3. Check Frontend Dependencies
if not exist "%FRONTEND_DIR%\node_modules" (
    echo Installing frontend dependencies...
    call npm --prefix "%FRONTEND_DIR%" install
    if errorlevel 1 (
        echo ERROR: Frontend dependency installation failed.
        pause
        exit /b 1
    )
)

REM 4. Check PostgreSQL vs SQLite
"%PYTHON_EXE%" -c "import psycopg, os, dotenv; dotenv.load_dotenv(r'%BACKEND_DIR%\.env'); psycopg.connect(dbname=os.getenv('POSTGRES_DB','hackathon'), user=os.getenv('POSTGRES_USER','postgres'), password=os.getenv('POSTGRES_PASSWORD',''), host=os.getenv('POSTGRES_HOST','127.0.0.1'), port=os.getenv('POSTGRES_PORT','5432'), connect_timeout=2)" >nul 2>&1
if errorlevel 1 (
    echo [Info] PostgreSQL is not reachable on port 5432. Using SQLite fallback.
    set USE_SQLITE=1
) else (
    echo [Info] Connected to active PostgreSQL server.
    set USE_SQLITE=0
)

echo [2/4] Applying database migrations...
"%PYTHON_EXE%" "%BACKEND_DIR%\manage.py" migrate --noinput

echo [3/4] Seeding initial data...
"%PYTHON_EXE%" "%BACKEND_DIR%\manage.py" seed_data

echo [4/4] Triggering servers...
echo.

REM Start Django Backend
if "%USE_SQLITE%"=="1" (
    start "Django Backend Server" /D "%BACKEND_DIR%" cmd /k "set USE_SQLITE=1&& "%PYTHON_EXE%" manage.py runserver 127.0.0.1:8000"
) else (
    start "Django Backend Server" /D "%BACKEND_DIR%" cmd /k ""%PYTHON_EXE%" manage.py runserver 127.0.0.1:8000"
)

REM Start React Frontend
start "React Frontend App" /D "%FRONTEND_DIR%" cmd /k "npm run dev"

echo ========================================================
echo   Both servers launched successfully!
echo   - Django Backend: http://127.0.0.1:8000
echo   - React Frontend: http://localhost:5173
echo ========================================================
echo.
pause
endlocal
