#!/bin/bash

npm run build:qa

git add -A

git commit -am "update qa"

git push qa master

