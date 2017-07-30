#!/bin/bash
# Must be installed uglify-es nodejs package (can be installed under root)
# npm install uglify-es -g
# npm install uglifycss -g
# and required net-misc/wput
### .config file is:
#!/bin/bash
# FTP_LOGIN=''      # ftp login
# FTP_PASSWORD=''   # ftp password
# FTP_PATH=''       # ftp path to files (from vhost root)

source .config

PATH_SCRIPTS='./scripts'
PATH_DICTS='./dictionaries'
PATH_COOKED='./dist'

# Build

echo '---'

# static files
echo 'Generating static files'

mkdir -p $PATH_COOKED/assets
rm -rf $PATH_COOKED/*.*

cp ./index.min.html                       $PATH_COOKED/index.html
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

cat $PATH_SCRIPTS/namegen.css >> $PATH_COOKED/temp.css
cat $PATH_SCRIPTS/namegen.flags.css >> $PATH_COOKED/temp.css

echo 'Compressing CSS files'

uglifycss $PATH_COOKED/temp.css > $PATH_COOKED/assets/namegen.css
rm $PATH_COOKED/temp.css

echo 'Ok.'
echo

# Upload

echo 'Uploading...'

cd $PATH_COOKED
find ** > /tmp/upload.list
wput --less-verbose --timestamping --input-file=/tmp/upload.list --reupload --binary ftp://$FTP_LOGIN:$FTP_PASSWORD@77.222.42.180/$FTP_PATH

rm /tmp/upload.list
echo 'Finish.'

