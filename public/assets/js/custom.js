$(document).ready(function(){

	var movementStrength = 25;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();

	$('body').mousemove(function( event ) {
		var pageX = event.pageX - $(window).width();
		var pageY = event.pageY - $(window).height();
		var newvalueX = width * pageX * -1 - 25;
		var newvalueY = height * pageY * -1 - 50;
		$('.main-page-img').css("background-position", newvalueX+"px     "+newvalueY+"px");
	})




	$(window).scroll(function(){

		//animations

		if(window.location.href.indexOf("main") > -1) {

			var wScroll = $(this).scrollTop();



			if(wScroll > $('.photo-links-section').offset().top - ($(window).height() / 3.5)) {
				$('.photo-links-section figure').each(function(i){
					setTimeout(function(){
						$('.photo-links-section figure').eq(i).addClass('is-showing');
					}, 200 * (i+1));
					
				})
			}


			if(wScroll > $('.week-jam').offset().top - ($(window).height() / 4.5)) {
				$('.week-jam article').each(function(i){
					setTimeout(function(){
						$('.week-jam article').eq(i).addClass('is-showing');
					}, 200 * (i+1));
					
				})
			}
		}
	})

});





