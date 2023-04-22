#!/usr/bin/env node
import fetch from 'node-fetch';
import minimist from 'minimist';
import moment from 'moment-timezone';


const args = minimist(process.argv.slice(2));
const timezone = moment.tz.guess();
var day = args.d;

if (args.h) {

    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);
    process.exit(0);
}

const longitude = args.e || (-args.w);
const latitude = args.n || (-args.s);


const req = await fetch(`https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&timezone='+timezone+'&daily=precipitation_hours`);
const dt = await req.json();


if (day == 0) {
  console.log("Rain today!")
} else if (day > 1) {
  console.log("Rain in " + day + " days.")
} else {
  console.log("Rain expected tomorrow!")
}




