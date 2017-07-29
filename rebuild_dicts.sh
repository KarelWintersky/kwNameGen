cd dictionaries
for i in *.js; do echo "<script type=\"text/javascript\" src=\"dictionaries/$i\"></script>" >> ../dicts.js; done;
cd ..
