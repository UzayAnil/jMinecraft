import sys, os
import urllib2
import json


def getServerVersions():
    data = urllib2.urlopen('https://s3.amazonaws.com/Minecraft.Download/versions/versions.json').read()
    return json.loads(data)

