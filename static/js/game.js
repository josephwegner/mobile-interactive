(function() {
	$(document).ready(function() {

		var balls = [];
		var ballMass = 10;
		var curRotation = 0;
		var len = $("#bar").width();
		var accelModifier = .005;
        var friction = .005;
        var run = false

		var init = function(e) {
			$(window).bind('orientation-change', orientationHandler);

			$(".ball").each(function() {
				balls.push({
					ele: this,
					velocity: 0
				});
			});

		};

		var orientationHandler = function(e, orientation) {
			$("#field").css({
				"-webkit-transform": "rotate(" + orientation.beta + "deg)"
			});

			curRotation = orientation.beta;
            
            if(!run) {
                run = setInterval(runFrame, 50);
            }
		};

		var runFrame = function() {
            //Convert to radians, by the way
			var theta = (180 - (90 + Math.abs(curRotation)) * Math.PI) / 180;

			var force = len * Math.cos(theta) * 9.8;

			var accel = (force / ballMass) * accelModifier;

			//Reapply the direction portion of the velocity, because we stripped it out with Math.abs
			accel = curRotation >= 0 ? accel : accel * -1;
            console.log("rotation of " + curRotation + " resulted in acceleration of " + accel);
			for(var i=0,max=balls.length; i<max; i++) {
                //console.log("Acceleration of " + accel + " will change " + balls[i].velocity + " to " + (balls[i].velocity + accel));
				balls[i].velocity += accel;
                
                if(Math.abs(balls[i].velocity) <= friction) {
                    balls[i].velocity = 0;
                } else {
                    balls[i].velocity = balls[i].velocity >= 0 ? balls[i].velocity - friction : balls[i].velocity + friction;
                }
                
				$(balls[i].ele).css('left', '+='+balls[i].velocity);
			}
		}

		$(window).bind('content-ready', init);

	});
})();