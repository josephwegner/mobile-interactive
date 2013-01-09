(function() {
    
    var baseUrl = document.location.protocol + "//" + document.location.host
    
    $(document).ready(function() {
        console.log("document ready");
        var socket = io.connect(baseUrl);

        var uniqueId = $("body").attr('data-id');

        socket.emit('mobile-register', {id: uniqueId});

        MobileReader.bindOrientation({
        	callback: function(orientation) {
        		console.log("send");
        		socket.emit('mobile-orientation', orientation);
        	},
        	interval: 500
        });

    });
})();