#!/bin/bash
# Must be installed uglify-es nodejs package (can be installed under root)
# npm install uglify-es -g
# npm install uglifycss -g

PATH_TEMPLATES='./templates'
PATH_SCRIPTS='./scripts'
PATH_DICTS='./dictionaries'
PATH_COOKED='./dist/'

# Build 
echo '---'
mkdir -p $PATH_COOKED/assets
rm -rf $PATH_COOKED/*.*


# static files
echo 'Generating static files'

cp $PATH_TEMPLATES/template.index.html    $PATH_COOKED/index.html
cp $PATH_SCRIPTS/flags.png                $PATH_COOKED/assets/flags.png
cp $PATH_SCRIPTS/jquery-2.2.4.min.js      $PATH_COOKED/assets/jquery.js

echo 'Ok.'
echo

#
echo 'Generating javascript files'

echo ; > $PATH_COOKED/temp.js
cat $PATH_DICTS/*.js >> $PATH_COOKED/temp.js
cat $PATH_SCRIPTS/namegen.engine.js   >> $PATH_COOKED/temp.js
cat $PATH_SCRIPTS/namegen.wlh.js      >> $PATH_COOKED/temp.js
cat $PATH_SCRIPTS/namegen.jqbind.js   >> $PATH_COOKED/temp.js

echo 'Compressing javascript files'

uglifyjs $PATH_COOKED/temp.js -o $PATH_COOKED/assets/namegen.js
rm $PATH_COOKED/temp.js

echo 'Ok.'
echo

#
echo 'Generating CSS files '

cat $PATH_SCRIPTS/namegen.css 		>> $PATH_COOKED/temp.css
cat $PATH_SCRIPTS/namegen.flags.css >> $PATH_COOKED/temp.css

echo 'Compressing CSS files'

uglifycss $PATH_COOKED/temp.css 	> $PATH_COOKED/assets/namegen.css
rm $PATH_COOKED/temp.css

echo 'Ok.'
echo

# Generating minimal static files
echo 'Generating minimal static files'
cp $PATH_TEMPLATES/template.index.min.html  $PATH_COOKED/index.min.html

sed -i -e "/\/\*namegen\.js\*\//{r $PATH_COOKED/assets/namegen.js"  -e 'd}' 	$PATH_COOKED/index.min.html
sed -i -e "/\/\*namegen\.css\*\//{r $PATH_COOKED/assets/namegen.css" -e 'd}' 	$PATH_COOKED/index.min.html

echo 'Ok.'

echo 'Finish.'

