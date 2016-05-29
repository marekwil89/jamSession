$(document).ready(function(){


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





