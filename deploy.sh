#!/usr/bin/env bash
cd ~/MAGN-Generator &&
git fetch --all &&
git reset --hard origin/master &&
git pull &&
cd ~/MAGN-Generator/app_vuetify &&
npm install &&
npm run build &&
rm -rf /usr/share/nginx/magn/* &&
cp -r ./dist/* /usr/share/nginx/magn &&
nginx -s reload &&
echo "Deployed"
