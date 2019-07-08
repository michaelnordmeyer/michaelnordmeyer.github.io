#!/usr/bin/env sh
curl -X POST -s --data-urlencode 'input@stats.js' https://javascript-minifier.com/raw > stats.min.js
ls -alh stats*.js
