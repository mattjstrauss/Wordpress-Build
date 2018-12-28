function generalCarousels() {

    if ( $('.carousel-component.image-carousel').length ) {
		
		$('.carousel-component.image-carousel').each(function(){

			$this = $(this);

			$('.carousel-slides',$this).on('init',function(){

	    		$('.slick-active').prev().removeClass('next-slide').addClass('previous-slide');
	    		$('.slick-active').next().removeClass('previous-slide').addClass('next-slide');
	    		$('.slick-active').removeClass('next-slide previous-slide');

			});

			$('.carousel-slides',$this).slick({
				arrows: true,
				dots: true,
				adaptiveHeight: true,
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 1,
				prevArrow: $('.previous-button', $this),
				nextArrow: $('.next-button', $this),
				// responsive: [
				// 	{
				// 		breakpoint: 768,
				// 		settings: {
				// 			arrows: false,
				// 			centerMode: true,
				// 			centerPadding: '40px',
				// 			slidesToShow: 1
				// 		}
				// 	},
				// 	{
				// 		breakpoint: 480,
				// 		settings: {
				// 			arrows: false,
				// 			centerMode: true,
				// 			centerPadding: '40px',
				// 			slidesToShow: 1
				// 		}
				// 	}
				// ]
			}).on('afterChange',function(){

			    $(".slick-active").prev().removeClass('next-slide').addClass('previous-slide');
			    $(".slick-active").next().removeClass('previous-slide').addClass('next-slide');
			    $('.slick-active').removeClass('next-slide previous-slide');

			}).on('beforeChange',function(){
			    
			    $('.slick-active').removeClass('next-slide previous-slide');

			});



		});

	}

	if ( $('.carousel-component.copy-carousel').length ) {
		
		$('.carousel-component.copy-carousel').each(function(){

			$this = $(this);

			$('.carousel-slides',$this).slick({
				arrows: true,
				dots: true,
				adaptiveHeight: true,
				prevArrow: $('.previous-button', $this),
				nextArrow: $('.next-button', $this),
			});



		});

	}

 	if ( $('.featured-carousel').length ) {
		
		$('.featured-carousel').each(function(){

			$this = $(this);

			$('.carousel-slides',$this).on('init',function(){

	    		$('.slick-active').prev().removeClass('next-slide').addClass('previous-slide');
	    		$('.slick-active').next().removeClass('previous-slide').addClass('next-slide');
	    		$('.slick-active').removeClass('next-slide previous-slide');

			});

			$('.carousel-slides',$this).slick({
				arrows: true,
				dots: true,
				adaptiveHeight: true,
				slidesToShow: 1,
				prevArrow: $('.previous-button', $this),
				nextArrow: $('.next-button', $this),
			}).on('afterChange',function(){

			    $(".slick-active").prev().removeClass('next-slide').addClass('previous-slide');
			    $(".slick-active").next().removeClass('previous-slide').addClass('next-slide');
			    $('.slick-active').removeClass('next-slide previous-slide');

			}).on('beforeChange',function(){
			    
			    $('.slick-active').removeClass('next-slide previous-slide');

			});



		});

	}

}