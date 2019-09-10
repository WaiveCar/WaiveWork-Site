#!/bin/bash
npm run build && aws s3 cp static s3://waivework/ --recursive
