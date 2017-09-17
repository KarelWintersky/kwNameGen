source ./.config

PATH_SCRIPTS='./scripts'
PATH_DICTS='./dictionaries'
PATH_COOKED='./dist/'

# Upload

echo 'Cleaning remote directory'

lftp -e "rm -rf /${FTP_PATH}; mkdir -p /${FTP_PATH}; bye" -u ${FTP_LOGIN},${FTP_PASSWORD} ${FTP_HOST}

echo 'Uploading...'

cd $PATH_COOKED
find ** > /tmp/upload.list
wput --less-verbose --timestamping --input-file=/tmp/upload.list --reupload --binary ftp://$FTP_LOGIN:$FTP_PASSWORD@$FTP_HOST/$FTP_PATH
rm /tmp/upload.list

echo 'Finish.'

