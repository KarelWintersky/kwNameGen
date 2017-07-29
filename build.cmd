@echo off
@rem `npm install uglify-es -g ` REQUIRED for build
@rem see https://github.com/mishoo/UglifyJS2/tree/harmony

echo ----
echo Creating 'dictionaries.js'
echo ----

echo ; > ./scripts/dictionaries.js
for /F %%i in ('forfiles /p .\dictionaries /m *.js') do (
  echo Adding file %%i
  @type ".\dictionaries\%%i" >> ./scripts/dictionaries.js
)
echo ----
echo Dictionary created
echo ----
echo Compressing dictionary
echo ----

uglifyjs ./scripts/dictionaries.js -o ./scripts/dictionaries.min.js > nul

echo ----
echo Dictionary compressed
echo ----
echo Erasing temp file
echo ----

del /Q scripts/dictionaries.js

echo ----
echo Erased.

