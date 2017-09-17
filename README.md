# Необходимые для сборки и деплоя пакеты и программы

```
npm install uglifycss -g
npm install uglify-es -g
```

+ требуется пакет `net-misc/wput` 

# Rebuild dictionaries
```
cd dictionaries
for i in *.js; do echo "<script type=\"text/javascript\" src=\"dictionaries/$i\"></script>" >> ../dicts.js; done;
cd ..
```

# Make production version

```
/bin/bash ./build.sh
/bin/bash ./upload.sh
```

Требуется конфигурационный файл вида:
```
### .config file is:
FTP_HOST=''		  # ftp host
FTP_LOGIN=''      # ftp login
FTP_PASSWORD=''   # ftp password
FTP_PATH=''       # ftp path to files (from vhost root)
```

# Country flags

```
/*!
 * Generated with CSS Flag Sprite generator (https://www.flag-sprites.com/)
 * + little fixes by Karel Wintersky
*/
```
