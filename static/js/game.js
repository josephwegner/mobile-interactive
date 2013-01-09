(function() {
	$(document).ready(function() {

		var balls = [];
		var ballMass = 10;
		var curRotation = 0;
		var len = $("#bar").width();
		var accelModifier = .001;

		var init = function(e) {
			$(window).bind('orientation-change', orientationHandler);

			$(".ball").each(function() {
				balls.push({
					ele: this,
					velocity: 0
				});
			});

			setInterval(runFrame, 10);
		};

		var orientationHandler = function(e, orientation) {
			$("#field").css({
				"-webkit-transform": "rotate(" + orientation.gamma + "deg)"
			});

			curRotation = orientation.gamma;
		};

		var runFrame = function() {
			var theta = 180 - (90 + Math.abs(curRotation));

			var force = len * Math.cos(theta) * 9.8;

			var accel = (force / ballMass) * accelModifier;
			console.log(theta, Math.cos(theta), len, force, accel);

			//Reapply the direction portion of the velocity, because we stripped it out with Math.abs
			accel = curRotation >= 0 ? accel : accel * -1;

			for(var i=0,max=balls.length; i<max; i++) {
				balls[i].velocity += accel;

				$(balls[i].ele).css('left', '+='+balls[i].velocity);
			}
		}

		$(window).bind('content-ready', init);

	});
})();