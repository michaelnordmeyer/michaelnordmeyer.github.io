#!/usr/bin/env sh
curl -X POST -s --data-urlencode 'input@s.js' https://javascript-minifier.com/raw > s.min.js
ls -alh s*.js
