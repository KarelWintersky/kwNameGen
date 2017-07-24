@echo off
echo ; > ./scripts/dictionaries.js
for /F %%i in ('forfiles /p .\dictionaries /m *.js') do (
  echo Adding file %%i
  @type ".\dictionaries\%%i" >> ./scripts/dictionaries.js
)