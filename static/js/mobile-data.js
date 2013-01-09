(function() {

	var capabilities = {
		orientation: true
	}

	var readers = {};


	if (window.DeviceOrientationEvent) {
 		readers.orientation = "dev";
	} else if (window.OrientationEvent) {
 		readers.orientation = "moz";
	} else {
 		console.log("Device orientation events not available!");
 		capabilities.orientation = false;
	}


	/******* Holder Vars **********/
	/*
	 * For reference, we need these holder vars because the default functionality of the device bindings are event listeners
	 * This presumably means that they will be called 100s of times per second - obviously way overloading the amount of times
	 * we can send data via socket.io per second.  Instead, we will store those variables locally, and allow the user
	 * to define (via setTimeout) how often they'd like to get an updated value.
	*/
	var orientation = {
		gamma: 0,
		beta: 0,
		alpha: 0,
		vaccel: 0
	}

	/******* Handler Functions *********/


	var orientationHandler = function(eventData) {
		var gamme;
		var beta;
		var alpha;
		var vaccel;

		if(readers.orientation === "dev") {

			// gamma is the left-to-right tilt in degrees, where right is positive
		   orientation.gamma = eventData.gamma;

		    // beta is the front-to-back tilt in degrees, where front is positive
		   orientation.beta = eventData.beta;

		    // alpha is the compass direction the device is facing in degrees
		   orientation.alpha = eventData.alpha

		    // deviceorientation does not provide this data
		   orientation.vaccel = null;
		} else if(readers.orientation === "moz") {
		    // x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
		   orientation.gamma = eventData.x * 90;

		    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
		    // We also need to invert the value so tilting the device towards us (forward) 
		    // results in a positive value. 
		   orientation.beta = eventData.y * -90;

		    // MozOrientation does not provide this data
		   orientation.alpha = null;

		    // z is the vertical acceleration of the device
		   orientation.vaccel = eventData.z;
		}
		orientation.vaccel = 100;
	} 






	/********** Reader Object **********/

	var bindings = {
		orientation: false
	}

	window.MobileReader = new function() {

		this.bindOrientation = function(opts) {
			if(capabilities.orientation) {
				var ev = readers.orientation === "dev" ? "deviceorientation" : "MozOrientation";

				window.addEventListener(ev, orientationHandler, false);

				var that = this;

				if(typeof(opts.callback) === "function" && typeof(opts.interval) !== "undefined") {
					return setInterval(function() { opts.callback(that.getOrientation()); }, opts.interval);
				}

				bindings.orientation = true;
			} else {
				throw new Error("This device is unable to bind to orientation events");
			}
		}

		this.getOrientation = function() {
			return orientation;
		}

	};

})();