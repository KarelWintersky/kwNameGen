#!/bin/bash
# Must be installed uglify-es nodejs package (can be installed under root)
# npm install uglify-es -g
# npm install uglifycss -g

SOURCEPATH='./scripts'
DICTPATH='./dictionaries'
DESTINATION='./dist/'

#
echo '---'
mkdir -p $DESTINATION/assets

# static files
echo 'Generating static files'

rm -rf $DESTINATION/*.*

cp ./index.min.html $DESTINATION/index.html
cp $SOURCEPATH/flags.png                $DESTINATION/assets/flags.png
cp $SOURCEPATH/jquery-2.2.4.min.js      $DESTINATION/assets/jquery.js

echo 'Ok.'
echo

#
echo 'Generating javascript files'

echo ; > $DESTINATION/temp.js
cat $DICTPATH/*.js >> $DESTINATION/temp.js
cat $SOURCEPATH/namegen.engine.js   >> $DESTINATION/temp.js
cat $SOURCEPATH/namegen.wlh.js      >> $DESTINATION/temp.js
cat $SOURCEPATH/namegen.jqbind.js   >> $DESTINATION/temp.js

echo 'Compressing javascript files'

uglifyjs $DESTINATION/temp.js -o $DESTINATION/assets/namegen.js

rm $DESTINATION/temp.js

echo 'Ok.'
echo

#
echo 'Generating CSS files '

cat $SOURCEPATH/namegen.css >> $DESTINATION/temp.css
cat $SOURCEPATH/namegen.flags.css >> $DESTINATION/temp.css

echo 'Compressing CSS files'

uglifycss $DESTINATION/temp.css > $DESTINATION/assets/namegen.css
rm $DESTINATION/temp.css

echo 'Ok.'
echo 

echo 'Finish.'