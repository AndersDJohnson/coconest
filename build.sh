#!/bin/sh
# compile
scons
# optimize
r.js -o name=browser/browser out=compiled/browser.build.js baseUrl=compiled/javascript
