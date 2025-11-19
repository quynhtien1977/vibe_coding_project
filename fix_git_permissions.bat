@echo off
echo Fixing Git repository...

cd client
echo Removing node_modules from Git tracking...
git rm -r --cached node_modules
cd ..

echo Staging changes...
git add .

echo Committing changes...
git commit -m "Fix: Remove node_modules from git to fix Vercel deployment"

echo.
echo ==========================================
echo Fix committed! 
echo Now please run: git push
echo ==========================================
pause
