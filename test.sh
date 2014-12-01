#!/bin/sh

grunt
rc=$?
echo $rc
if [[ $rc != 0 ]] ; then
    echo "FAIL"
    exit $rc
fi
echo goooon
