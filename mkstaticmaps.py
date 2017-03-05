import subprocess
import os

maps = [ 
    { 
        "name":"Groton Town Forest",
        "location" : "-71.61050,42.59100",
        "zoom" : 16
    },
    { 
        "name":"Groton Place",
        "location" : "-71.59423,42.59801",
        "zoom" : 16
    },
    { 
        "name":"Hazel Grove Park",
        "location" : "-71.59476,42.61533",
        "zoom" : 16
    },
    { 
        "name":"Bertozzi Conservation Area",
        "location" : "-71.65447,42.63427",
        "zoom" : 17
    },
    { 
        "name":"Throne Hill Area",
        "location" : "-71.62800,42.6225",
        "zoom" : 16
    },
    { 
        "name":"Hayes Woods",
        "location" : "-71.61342,42.61843",
        "zoom" : 17
    },
    { 
        "name":"Bates Blackman Area",
        "location" : "-71.56439,42.59370",
        "zoom" : 17
    },
    { 
        "name":"Skinner Forest Area",
        "location" : "-71.50694,42.59633",
        "zoom" : 16
    },
    { 
        "name":"Skitapet Conservation Land",
        "location" : "-71.52002,42.60541",
        "zoom" : 17
    },
    { 
        "name":"Gamlin Crystal Spring Conservation Area",
        "location" : "-71.50750,42.62940",
        "zoom" : 17
    },
    { 
        "name":"Cox Walker Conservation Area",
        "location" : "-71.55620,42.63270",
        "zoom" : 16
    },
    { 
        "name":"Williams Barn Area",
        "location" : "-71.55311,42.62271",
        "zoom" : 16
    },
    { 
        "name":"Wharton Plantation",
        "location" : "-71.52252,42.62850",
        "zoom" : 15
    },
    { 
        "name":"Shepley Hill",
        "location" : "-71.57378,42.63035",
        "zoom" : 17
    },
    { 
        "name":"J. Harry Rich State Forest",
        "location" : "-71.57960,42.63770",
        "zoom" : 16
    },
    { 
        "name":"General Field Surrenden Farm Area",
        "location" : "-71.59286,42.58495",
        "zoom" : 16
    },
    { 
        "name":"Hawtree Conservation Area",
        "location" : "-71.54037,42.63874",
        "zoom" : 17
    },
    { 
        "name":"Scarlet Hill",
        "location" : "-71.55105,42.61250",
        "zoom" : 17
    },
    { 
        "name":"Batton Woods Area",
        "location" : "-71.51127,42.58183",
        "zoom" : 17
    },
    { 
        "name":"Rocky Hills",
        "location" : "-71.54271,42.58127",
        "zoom" : 16
    }
]

maps = [ maps[0] ]

for mape in maps:
    mapId = "https://api.mapbox.com/v4/jremillard.6095d11a"
    token = "access_token=pk.eyJ1IjoianJlbWlsbGFyZCIsImEiOiJzX2dhaXN3In0.qWyAnddfUVfs61ojApFvsg"
    cmd = 'curl \"{}/{},{}/1200x1200.png?{}\" -o temp.png'.format(mapId,mape['location'],mape['zoom'],token)
    os.system(cmd)

    magick = "C:\\Program Files\\ImageMagick-7.0.3-Q16\\magick"

    cmd = '{} convert -size 1200x100 xc:white footer.png'.format(magick)
    subprocess.call( [ magick,'convert','-size','1200x100','xc:white','footer.png']);

    title = '{} Trail Map - www.grotontrails.org'.format( mape['name'])
    subprocess.call( [ magick,'footer.png','-gravity','South','-pointsize','25','-annotate','+0+50',title,'footer.png'])

    attrib = "Copyright MapBox and OpenStreetMap Contributors"
    subprocess.call( [ magick,'footer.png','-gravity','South','-pointsize','10','-annotate','+0+20',attrib,'footer.png'])

    subprocess.call( [ magick,'temp.png','footer.png','-append','temp.png'])
    subprocess.call( [ magick,'temp.png','images/GTN-green-180.png','-gravity','center','-append','temp.png'])

    pdfFile =  '{} Trail Map - Groton MA.pdf'.format(mape['name'])
    subprocess.call( [ magick,'temp.png','-quality','100','-page','1200x1480','-units','PixelsPerInch','-density','150x150',pdfFile])

    subprocess.call( [ 'rm','temp.png'])
    subprocess.call( [ 'rm','footer.png'])


