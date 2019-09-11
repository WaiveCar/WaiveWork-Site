#!/bin/bash
npm run build 
aws cloudfront create-invalidation --distribution-id E3K7J18T9N82X6 --paths '/*'  
aws s3 cp static s3://waivework/ --recursive
