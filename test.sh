#!/bin/sh

grunt
rc=$?
echo $rc
if [[ $rc != 0 ]] ; then
    exit $rc
fi
echo goooon
