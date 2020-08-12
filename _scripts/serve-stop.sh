#!/bin/bash

kill -9 $(pgrep -d " " -f "node.*processName.*StoreManagement")
true
