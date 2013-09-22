#!/bin/bash
cd $( dirname "${BASH_SOURCE[0]}" )
VERSION=1.6.4

mkdir -p textures
wget --quiet -N https://s3.amazonaws.com/Minecraft.Download/versions/${VERSION}/${VERSION}.jar -O textures/minecraft.jar
cd textures
rm -rf assets
mkdir -p temp
unzip minecraft.jar -d temp > /dev/null
mv temp/assets .
rm -rf temp
