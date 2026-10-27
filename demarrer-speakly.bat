@echo off
REM ==========================================================================
REM  SPEAKLY - lancement en un double-clic (Windows)
REM  Demarre un petit serveur local puis ouvre l'application dans le navigateur.
REM ==========================================================================
setlocal
cd /d "%~dp0"

set "NODE="
where node >nul 2>nul && set "NODE=node"
if not defined NODE (
  if exist "C:\Users\user\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe" (
    set "NODE=C:\Users\user\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
  )
)

if not defined NODE (
  echo.
  echo   Node.js est introuvable sur cet ordinateur.
  echo   Installe-le depuis https://nodejs.org puis relance ce fichier.
  echo.
  echo   En attendant, tu peux ouvrir directement index.html dans ton navigateur
  echo   ^(le micro et la reconnaissance vocale risquent d'etre bloques^).
  echo.
  pause
  exit /b 1
)

echo.
echo   Demarrage de SPEAKLY...
"%NODE%" scripts\serve.js %*
if errorlevel 1 pause
endlocal
