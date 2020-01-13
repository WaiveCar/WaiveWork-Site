#!/bin/bash
npm run build
scp -r ./static/* waivework:/var/www/waivework/  
