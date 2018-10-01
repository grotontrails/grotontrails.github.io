import urllib.request
import os
import time
import email.utils
import datetime

def parse_http_datetime(s):
    return email.utils.mktime_tz(email.utils.parsedate_tz(s))

filename = "massachusetts-latest.osm.pbf"

with urllib.request.urlopen("https://download.geofabrik.de/north-america/us/massachusetts-latest.osm.pbf") as response:
    with open(filename,"wb") as file:
        file.write(response.read() )

    modifiedTimeStamp = parse_http_datetime(response.headers['last-modified'])

    modifiedTime = datetime.datetime.fromtimestamp(modifiedTimeStamp)

    print("{} update time: {}".format(filename,modifiedTime) )
    os.utime(filename, times=(modifiedTimeStamp,modifiedTimeStamp))

    with open("../scripts/modifiedtime.js","wt") as outputFile:

        print("var osmDataTime = \"{}\"".format(modifiedTime),file=outputFile)





