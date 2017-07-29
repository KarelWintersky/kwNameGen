#!/bin/bash
# Must be installed uglify-es nodejs package (can be installed under root)
# npm install uglify-es -g
# npm install uglifycss -g

echo ----
echo Creating 'dictionaries.js'...

echo ; > ./scripts/dictionaries.js
cat ./dictionaries/*.js >> ./scripts/dictionaries.js

echo ... Dictionary created.
echo ----
echo Compressing dictionary...

uglifyjs ./scripts/dictionaries.js -o ./scripts/dictionaries.min.js

echo
echo ... Dictionary compressed.
echo ----
echo Erasing temp file...

rm ./scripts/dictionaries.js

echo ...Erased.