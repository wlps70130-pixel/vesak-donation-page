@echo off
setlocal
cd /d "%~dp0"
start "Vesak App Server" /min "C:\Users\Benz\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 4173 --bind 127.0.0.1
timeout /t 1 >nul
start "" "http://127.0.0.1:4173/index.html"
