(function() {
    
    var baseUrl = document.location.protocol + "//" + document.location.host
    
    $(document).ready(function() {
        console.log("document ready");
        var socket = io.connect(baseUrl);

        var uniqueId = $("body").attr('data-id');

        socket.emit('mobile-register', {id: uniqueId});

        socket.on('start', function(data) {
            MobileReader.bindOrientation({
            	callback: function(orientation) {
            		socket.emit('mobile-orientation', orientation);
                    $(".count").text(parseInt($(".count").text()) + 1);
            	},
            	interval: 500
            });
        });
    });
})();