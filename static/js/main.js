(function() {
    
    var baseUrl = document.location.protocol + "//" + document.location.host
    
    var allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var ranLength = 50;
    
    var uniqueId = "";
    
    for(var i=0; i<ranLength; i++) {
        uniqueId += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    $(document).ready(function() {
        $("#qr").qrcode(baseUrl + "/mobile/" + uniqueId);  
        console.log(baseUrl + "/mobile/" + uniqueId);
        
        var socket = io.connect(baseUrl);

        socket.emit('desktop-register', {id: uniqueId});
        console.log("registration sent");

        socket.on('mobile-on', function(data) {
            alert("Mobile on! " + Date.now()); 
        });

    });
})();