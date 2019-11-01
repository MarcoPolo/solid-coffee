#!/bin/bash
yarn build
rsync -avzh build/ /keybase/private/marcopolo,kbpbot/coffee-timer/
