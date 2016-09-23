#!/bin/bash

# Download cf command line client
wget -O - https://cli.run.pivotal.io/stable\?release\=linux64-binary\&source\=github | tar xvz -C .

if [ $1 = "userstat" ]
    then
    ./cf login -a https://api.cf.us10.hana.ondemand.com -u $CF_USER -p $CF_PASS -o userstats -s dev
fi

echo $1

./cf push $1 -c "npm run build" --no-manifest