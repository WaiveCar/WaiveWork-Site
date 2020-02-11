#!/bin/bash
npm run build
scp -r ./static/* waivework:/var/www/waivework/  
scp -r ./welcome/* waivework:/var/www/waivework/welcome/
