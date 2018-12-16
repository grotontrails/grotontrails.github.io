
@powerlineColor: #443f3f;
@bikeColor: blue;
@trailColor: green;
@sidwalkColor: gray;
@publicWidth: 2.5;
@permissiveWidth: 1.5;
@privateWidth: 1;
@parkingColor: #f1ed82;

// power lines
#original[power='line'] {
 line-color: @powerlineColor;
 line-width: .4;
}

// trail, sidewalks, tracks, paths
#original {  

// sidewalks
[access!='customers'][access!='private'][highway='footway'][surface='paved'] {
  [zoom >= 15] {
    line-color:@sidwalkColor; 
    line-width: @publicWidth;        
  }    
}
  
// paths not wide.
[highway='path'][width != "2"]  {   
  // un- maintained trails
  [zoom >= 14] {
    line-color:@trailColor; 
    line-width: @permissiveWidth;    
    line-dasharray: 4,4;
  }
  
  // maintained trails
  [operator!=null] {
      line-color:@trailColor; 
      line-width: @publicWidth; 
      [zoom >= 14] {      
        line-dasharray: 4,2;
      }
   }
  
  // private trails, keep off
  [access != 'permissive']
  [access != 'yes']
  [access != 'public']
  [access != 'designated']
  [access != null] 
  [surface!='paved'] {
     // not public          
      [zoom < 15] {
        line-width: 0;
      }
      [zoom >= 15] {
      line-color: red;
      line-width: @privateWidth;
      line-dasharray: 4,8;
      }
  }          
}

// wide paths
[highway='path'][width = "2"][operator!=null] {
    line-color:@trailColor; 
    line-width: @publicWidth;    
}

// wide paths, marked as tracks.
[highway='track'] {
  [access = 'yes'],[access = 'public'],[operator!=null],[foot='yes'] {
    line-color:@trailColor; 
    line-width: @publicWidth;    
  }
}

// bike trials
[highway='cycleway'] {
  // paved biketrails
  line-color:@bikeColor; 
  line-width: @publicWidth;

  [surface!='paved'][surface!='gravel'] {
    [operator=null] {
      line-dasharray: 3,7;
      line-width: @privateWidth;
    }
    [operator!=null] {
      line-dasharray: 4,2;
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


[junction='yes'] {
    text-name : @name;
    text-face-name: @sans_lt;
    text-fill: @road_text;
    text-halo-fill: fadeout(@land,85);
    text-halo-radius: 2.5;
    text-halo-rasterizer: fast;
    text-placement: point;
    //line-color: black;
    [zoom>=15] { text-size: 10; }
    [zoom>=16] { text-size: 14; text-face-name: @sans; }
    [zoom>=17] { text-size: 16; text-face-name: @sans; }
}

[highway !='footway'][junction!='yes'] {
  text-avoid-edges: true;
  text-name: @name;
  text-placement: line;
  text-face-name: @sans;
  text-fill: #666;
  text-size: 10;
  text-halo-fill: fadeout(@land,60);
  text-halo-radius: 0;
  text-halo-rasterizer: fast;
  text-dy: 3;
  //text-min-distance: 200; // only for labels with the same name
  [zoom>=14] { text-size: 12; }
  [zoom>=16] { text-size: 14; }
  [zoom>=18] { text-size: 18; }
}

  
}