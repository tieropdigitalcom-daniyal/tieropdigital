@echo off
setlocal
cd /d "%~dp0"
title TIEROP DIGITAL - Local Website
where node.exe >nul 2>nul
if errorlevel 1 goto missing_node
where npx.cmd >nul 2>nul
if errorlevel 1 goto missing_node
node scripts/prepare-local.mjs
if errorlevel 1 goto failed
echo.
echo Installing website dependencies. The first run needs internet.
echo Please keep this window open.
echo.
call npx.cmd --yes pnpm@11.25.0 install --frozen-lockfile
if errorlevel 1 goto failed
echo.
echo Starting TIEROP DIGITAL...
echo Open http://localhost:5173 in Chrome or Edge when the server is ready.
echo If another address is printed below, use that address instead.
echo Keep this window open while using the website. Press Ctrl+C to stop it.
echo.
call npx.cmd --yes pnpm@11.25.0 dev
if errorlevel 1 goto failed
exit /b 0
:missing_node
echo.
echo Install Node.js LTS from https://nodejs.org/en/download first.
echo Then close this window and open START-WEBSITE.bat again.
pause
exit /b 1
:failed
echo.
echo The website did not start. Check the error above.
echo Setup instructions are in START-HERE.txt.
pause
exit /b 1
