@echo off
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js or serve this folder from any localhost/HTTPS server.
  pause
  exit /b 1
)
start "" "http://localhost:8080/"
node "%~dp0server.js"
pause
