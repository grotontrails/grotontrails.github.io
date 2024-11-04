    var reportemail = 'Groton.Trails.Network@gmail.com,tommymontilli@gmail.com,ridindirtymtb@gmail.com';
    
    function confirmTrailReport () {
        if (confirm("Report trail issues such as downed trees, damaged bridges, missing trail markers, flooded trails to the Groton Trails Committee?  The email will include your GPS location.") == true) {
            sendEmail();
        }
    }
    function sendEmail() {
        if (navigator.geolocation) {
            var options = {
                    enableHighAccuracy: true,
                    timeout: 7000,
                    maximumAge: 0
                  };
            navigator.geolocation.getCurrentPosition(sendPosition,sendReport,options);
        } else
            sendReport(null);
   }
   function sendPosition (position) {
       var href = location.href;
       if (href.indexOf('#') > 0)
           href = href.substr(0, href.indexOf('#')); 
       href = href.replaceAll('about.html','Interactive_Maps.html');
       var emailBody = href+'%23map%3D18/'+position.coords.latitude.toString()+'/'+position.coords.longitude.toString()+'/mark/'+ position.coords.accuracy+'\n';
       document.location = "mailto:"+reportemail+"?subject=Trail Issue Report&body="+emailBody;
   }
   function sendReport (ignored) {
       document.location = "mailto:"+email+"?subject=Trail Issue Report";
   }