./node_modules/.bin/webpack
cp -r *.html maps/ dist/
if [ ! -f dist/index.json ]; then
    cp index.json dist/
fi