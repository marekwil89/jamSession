var services = angular.module('services', []);

//service for redirect logout user from pages

services.service('redirect', function($location, _){

	this.ifLogout= function(authenticated, current_user){
		if(authenticated == false || !current_user || _.isEmpty(current_user)){
			$location.path('/mainPage')
		}
	};
	
	this.ifNotAdmin= function(admin){
		if(admin == false){
			$location.path('/mainPage')
		}
	}; 
})


//smooth scroll when click arrow on main page

services.service('anchorSmoothScroll', function(){
	
	this.scrollTo = function(eID) {
		
		var startY = currentYPosition();
		var stopY = elmYPosition(eID);
		var distance = stopY > startY ? stopY - startY : startY - stopY;
		if (distance < 100) {
			scrollTo(0, stopY); return;
		}
		var speed = Math.round(distance / 10);
		if (speed >= 20) speed = 20;
		var step = Math.round(distance / 25);
		var leapY = stopY > startY ? startY + step : startY - step;
		var timer = 0;
		if (stopY > startY) {
			for ( var i=startY; i<stopY; i+=step ) {
				setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
				leapY += step; if (leapY > stopY) leapY = stopY; timer++;
			} return;
		}
		for ( var i=startY; i>stopY; i-=step ) {
			setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
			leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
		}
		
		function currentYPosition() {
			// Firefox, Chrome, Opera, Safari
			if (self.pageYOffset) return self.pageYOffset;
			// Internet Explorer 6 - standards mode
			if (document.documentElement && document.documentElement.scrollTop)
				return document.documentElement.scrollTop;
			// Internet Explorer 6, 7 and 8
			if (document.body.scrollTop) return document.body.scrollTop;
			return 0;
		}
		
		function elmYPosition(eID) {
			var elm = document.getElementById(eID);
			var y = elm.offsetTop;
			var node = elm;
			while (node.offsetParent && node.offsetParent != document.body) {
				node = node.offsetParent;
				y += node.offsetTop;
			} return y;
		}

	};
	
});
