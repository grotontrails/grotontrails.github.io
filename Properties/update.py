from mako.template import Template
from mako.runtime import Context
from StringIO import StringIO

import glob
import yaml
import os;
import codecs;

files = glob.glob('*.page')

mytemplate = Template(filename='property.template',default_filters=['decode.utf8'],input_encoding='utf-8',output_encoding='utf8')

for srcFileName in files :
  srcFile = file(srcFileName,'r')
  
  baseFileName = os.path.splitext(srcFileName)[0]
  outputFileName = baseFileName + ".html"
  print(outputFileName);
  
  data = yaml.load(srcFile);
  
  # handle default activities
  if ( not 'activities' in data ) :
    data['activities'] = [];
  if ( not 'links' in data) : 
    data['links'] = [];
  if ( not 'photos' in data) : 
    data['photos'] = [];
    
  for activity in data['activities'] :
    if ( activity == 'default') :
      data['activities'].remove('default')
      if ( data['owner'] == 'Town Of Groton, Conservation Commission') :
        data['activities'].extend(['Hiking', 'Mountain Biking', 'Equestrian', 'Cross Country Skiing', 'Snowshoeing', 'Hunting']);
      else :
        data['activities'].extend(['Hiking', 'Mountain Biking', 'Equestrian', 'Cross Country Skiing', 'Snowshoeing']);
  
  # default owner URL from owner.
  if ( not 'ownerUrl' in data ) :
    if ( data['owner'] == 'Town Of Groton, Town Forest Committee') : 
      data['ownerUrl'] = 'http://www.townofgroton.org/Town/BoardsCommittees/TownForestCommittee.aspx'
    elif ( data['owner'] == 'Town Of Groton, Conservation Commission') : 
      data['ownerUrl'] = 'http://www.townofgroton.org/Town/BoardsCommittees/ConservationCommission.aspx'
    else :
      data['ownerUrl'] = ''
     
  # default hours, based on owner
  if ( not 'hours' in data ) : 
    if ( data['owner'] == 'Town Of Groton, Conservation Commission') : 
      data['hours'] = 'Dust To Dawn'
    else :
      data['hours'] = 'Dust To Dawn'
      
  if ( not 'parking' in data) :
    data['parking'] = ''
    
  if ( not 'address' in data ) :
    data['address'] = ''
    data['directionsX'] = ''
    data['directionsY'] =''
    
  if ( not 'description' in data ) :
     data['description'] = ''
    
  data['baseFileName'] = baseFileName;
  
     
  buf = StringIO()
  ctx = Context(buf,**data)
  mytemplate.render_context(ctx)
    
  outputFile = codecs.open(outputFileName,encoding='utf-8', mode='w')
  outputFile.write(buf.getvalue() )
  outputFile.close()

