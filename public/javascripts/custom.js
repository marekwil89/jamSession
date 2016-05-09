$(document).ready(function(){

	$(window).scroll(function(){

		var wScroll = $(this).scrollTop();



		if(wScroll > $('.photo-links-box').offset().top - ($(window).height() / 3.0)) {
			$('.photo-links-box figure').each(function(i){
				setTimeout(function(){
					$('.photo-links-box figure').eq(i).addClass('is-showing');
				}, 200 * (i+1));
				
			})
		}


		if(wScroll > $('.last-jams').offset().top - ($(window).height() / 3.5)) {
			$('.last-jams article').each(function(i){
				setTimeout(function(){
					$('.last-jams article').eq(i).addClass('is-showing');
				}, 200 * (i+1));
				
			})
		}

	})

});





