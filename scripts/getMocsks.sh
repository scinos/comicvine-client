#!/bin/sh

APIKEY=40ffde96b2e84ffa315b5f14d289175ae907a6a1
RESULTS=./results

function load {
    FILE=${RESULTS}/$1
    RESOURCE=$1
    wget "http://api.comicvine.com/${RESOURCE}/?api_key=${APIKEY}&format=json" -O ${FILE}_.json
    wget "http://api.comicvine.com/${RESOURCE}/?api_key=${APIKEY}&format=json&offset=100&limit=100" -O ${FILE}_100-100.json
    wget "http://api.comicvine.com/${RESOURCE}/?api_key=${APIKEY}&format=json&offset=0&limit=10" -O ${FILE}_0-10.json
    wget "http://api.comicvine.com/${RESOURCE}/?api_key=${APIKEY}&format=json&offset=10&limit=10" -O ${FILE}_10-10.json
}

[ -d "$RESULTS" ] ||   mkdir $RESULTS

load $1
