
@powerlineColor: #443f3f;
@bikeColor: blue;
@trailColor: green;
@sidwalkColor: gray;
@publicWidth: 2.5;
@permissiveWidth: 1.2;
@privateWidth: 1;
@parkingColor: #f1ed82;

// power lines
#original[power='line'] {
 line-color: @powerlineColor;
 line-width: .4;
}

// trail, sidewalks, tracks, paths
#original {  
  
  [highway='path'],
  [highway='footway'],
  [highway='cycleway'],
  [highway='track'] {
    
 // 100% sure this way is public
  [access = 'yes'],[access = 'public'],
  [foot = 'yes'],[foot = 'public'],[foot = 'designated'],
  [operator='Groton Trails Committee'],
  [operator='Massachusetts Audubon Society'] {     
    
    [highway='cycleway'] { 
      line-color:@bikeColor; 
      line-width: @publicWidth;
      [surface != 'paved'][zoom >= 14] {
        line-dasharray: 4,1;
      }
    }
    
    [highway='path'][surface!='paved'],
    [highway='footway'][surface!='paved'] { 
      line-color:@trailColor; 
      line-width: @publicWidth*.9; 
      [zoom >= 14] {
      line-dasharray: 4,1;
      }
    }
    
    [highway='track'][surface!='paved'] {
       line-color:@trailColor; 
       line-width: @publicWidth;    
    }      
    }

  [foot = 'permissive'],
  [access = 'permissive'],
  [access = null][foot = null] {
  [operator!='Groton Trails Committee'][operator!='Massachusetts Audubon Society'] {
       // probably public, not sure    
    [highway='cycleway'] { 
      line-color:@bikeColor; 
      line-width: @permissiveWidth;
    }
    
    [highway='path'][surface!='paved'],
    [highway='footway'][surface!='paved'] { 
      [zoom >= 15]  {
      line-color:@trailColor; 
      line-width: @permissiveWidth;    
      line-dasharray: 3,7;
      }
	}
 
    [highway='track'][surface!='paved'] { 
      [zoom >= 14 ] {
      line-color:@trailColor; 
      line-width: @permissiveWidth;     
     }
    }
          
    [highway='path'][surface='paved'], 
    [highway='footway'][surface='paved'] { 
      [zoom >= 15] {
      line-color:@sidwalkColor; 
      line-width: @publicWidth;     
      }
    }
   }  
  }

  
  // no access
  [access != 'permissive']
  [access != 'yes']
  [access != 'public']
  [access != null] {
     // not public
          
    [highway='path'][surface!='paved'],
    [highway='footway'][surface!='paved'] { 
      [zoom >= 15] {
      line-color: red;
      line-width: @privateWidth;
      line-dasharray: 4,8;
      }
    }       
  }  
}

['gtc:parking' = 'yes']
[amenity  = 'parking'][zoom >= 16] {
  text-name: 'P';
  text-face-name: @sans_bold;
  text-placement: point;        
  text-fill: black;
  line-width: 1;
  line-opacity: 0.5;
  line-color: #426;
  polygon-fill: @parkingColor;
  polygon-opacity: 0.3;
     
  [zoom >= 16] { text-size: 18; }
 
 
}

}