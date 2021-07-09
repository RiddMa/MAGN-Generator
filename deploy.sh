#!/usr/bin/env bash
cd ~/MAGN-Generator &&
git fetch -all &&
git reset --hard origin/master &&
git pull &&
npm run build &&
rm -rf /usr/share/nginx/html/* &&
cp -r ~/MAGN-Generator/dist/* /usr/share/nginx/html &&
nginx -s reload &&
echo "Deployed"