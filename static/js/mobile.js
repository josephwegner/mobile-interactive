(function() {
    
    var baseUrl = document.location.protocol + "//" + document.location.host
    
    $(document).ready(function() {
        console.log("document ready");
        var socket = io.connect(baseUrl);

        var uniqueId = $("body").attr('data-id');

        socket.emit('mobile-register', {id: uniqueId});
        console.log("registration sent at " + Date.now());

    });
})();