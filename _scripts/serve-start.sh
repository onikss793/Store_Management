#!/bin/bash

SM_STAGE=dev npx sls offline start --skipCacheInvalidation --processName StoreManagement &
sleep 2
echo "[[ STORE_MANAGEMENT ]]: SERVER STARTED!!!"
