#!/bin/bash

tslint -t json -o report.json --project . 2> /dev/null
npm run test:coverage
npm run sonar-scanner
