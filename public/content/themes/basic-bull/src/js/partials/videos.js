function videos() {
	
	const players = Array.from($('.video-object')).map(player => new Plyr(player, {
		iconUrl: 'http://wordpress.bullinteractive.co/content/themes/basic-bull/img/spritemap.svg',
		iconPrefix: "icon-ui-media",
	}));


	$('.embed-background').each(function(e){

		$this = $(this);

		var timeoutId;
		var $videoBgAspect = $this.find('.embed-background-video');
		var $videoContainer = $this.find('.video-background');
		var videoAspect = $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

		function videobgEnlarge() {
		 
		  windowAspect = ($(window).height() / $(window).width());
		  if (windowAspect > videoAspect) {
		    $videoContainer.width((windowAspect / videoAspect) * 100 + '%');
		  } else {
		    $videoContainer.width(100 + "%")
		  }

		    
		}

		$(window).resize(function() {
		  clearTimeout(timeoutId);
		  timeoutId = setTimeout(videobgEnlarge, 100);
		});

		$(function() {
		  videobgEnlarge();
		});

	});

	

}