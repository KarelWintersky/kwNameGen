# Необходимые для сборки проекта пакеты

https://www.npmjs.com/package/uglifycss

```
npm install uglifycss -g
npm install uglify-es -g
```

# Development version

```
cd dictionaries
for i in *.js; do echo "<script type=\"text/javascript\" src=\"dictionaries/$i\"></script>" >> ../dicts.js; done;
cd ..
```

# Make production version

```
chmod +x build.sh
/bin/bash ./build.sh
```

или
```
./build.cmd
```
