@echo off
title Sidr Honey - Site Editor
cd /d "C:\Users\kayel\Projects\SidrHoney"
if not exist package.json (
  echo   Could not find the website project folder. Ask Claude to fix this shortcut.
  pause
  exit /b 1
)
start "" /b cmd /c "timeout /t 8 /nobreak >nul & start http://localhost:3010/edit"
echo.
echo   Starting your site editor... your browser will open in a few seconds.
echo   Keep this black window open while you edit.
echo.
call npm run edit
pause
