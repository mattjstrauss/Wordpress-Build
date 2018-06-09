function accordions() {

    // Accordion
    $accordion = $('.accordion-component')
    $accordionPanel = $('.accordion-panel');
    $panelButton = $('.panel-heading button');
    $panelContent = $('.accordion-panel .panel-content');

    // Sets the states of the panels
    $accordionPanel.each(function() {
        
        $this = $(this);
        
        $this.addClass('inactive-panel');

        if ( $this.hasClass('inactive-panel') ) {

            $currentPanelContent = $this.find('.panel-content');

            TweenMax.to($currentPanelContent, 0, {
                height: 0
            });

            $panelButton.attr({'aria-expanded': 'false'});
            $panelContent.attr({'aria-hidden': 'true'});

        }

    });

    $panelButton.on('click', function(e){
        
        e.preventDefault();

        $this = $(this);

        // Current panel of button clicked
        $currentPanel = $this.closest('.accordion-panel');
        // Closest content of the current button clicked
        $currentPanelContent = $currentPanel.find('.panel-content');
        // Header height compensation for the scrollto funciton
        $headerHeight = $('.site-header').outerHeight();
        
        function setHeight(){
              TweenMax.from($currentPanelContent, 0.3, { height: 0 });
        }

        if ( $currentPanel.hasClass('inactive-panel') ) {

            // Toggle accessibility for the button
            $panelButton.attr({'aria-expanded': 'false'});
            $this.attr({'aria-expanded': 'true'});

            // Toggle accessibility for the content
            $panelContent.attr({'aria-hidden': 'true'});
            $currentPanelContent.attr({'aria-hidden': 'false'});
            
            // Closes "all" panels
            $accordionPanel.removeClass('active-panel').addClass('inactive-panel');
            TweenMax.to($panelContent, 0.3, { height: 0 });

            // Opens this panel
		    $currentPanel.removeClass("inactive-panel").addClass("active-panel");
		    TweenMax.set($currentPanelContent, { 
                height: "auto", 
                onComplete: setHeight() 
            });

            // Goes to the clicked panel
            setTimeout(function(){
                
                $('html, body').animate({
                    scrollTop:$this.offset().top-$headerHeight
                }, 300);

            }, 300);

        } else {

            // Toggle accessibility for the button
            $this.attr({'aria-expanded': 'false'});
            
            // Toggle accessibility for the content
            $currentPanelContent.attr({'aria-hidden': 'true'});
            
            // Closes this panels
            TweenMax.to($currentPanelContent, 0.2, { height: 0 });
            $currentPanel.addClass("inactive-panel").removeClass("active-panel");

        }


    });

}
function youtube(){

	var player;
	
	player = new YT.Player('video', {
        events: {
        	'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    function onPlayerReady(event) {
		event.target.playVideo();
		event.target.seekTo(0,true);
		// bind events
		var playButton = document.getElementById("play-button");
		playButton.addEventListener("click", function() {

			player.playVideo();

		});

		$iframe = player.getIframe();
		console.log($iframe);
	}

	// The API calls this function when the player's state changes.
	function onPlayerStateChange(event) {

		if (event.data == YT.PlayerState.UNSTARTED) {
			
			// setTimeout(stopVideo, 6000);

		} else if (event.data == YT.PlayerState.PLAYING) {

			// $iframe = player.getIframe();

			$('.slide').addClass('active-media');

			console.log('playing');

		} else if (event.data == YT.PlayerState.PAUSED ){

			paused = true;

			setTimeout(function(){

				if (paused == true) {
				
				$('.slide').removeClass('active-media');

					console.log(paused);

				}

			}, 100);

			// $('.slide').removeClass('active-media');
			console.log('paused');

		} else if (event.data == YT.PlayerState.ENDED) {

			console.log('ended');
			
			// player.destroy();

			$('.slide').removeClass('active-media');

			player.pauseVideo().seekTo(0,true);

		} else if (event.data == YT.PlayerState.BUFFERING ){

			paused = false;

			console.log('buffering');

			console.log(paused);

		} else if (event.data == YT.PlayerState.CUED) {

			console.log('video cued');

		}

	}
};

function vimeo(){
	
	$iframe = $('.slick-current iframe');
	$playButton = $('.play-button');

    var player = new Vimeo.Player($iframe);

	$playButton.on('click', function(e) {
		player.play();
	});

	player.on('pause', function(data) {
    	$('.slide').removeClass('active-media');
	});	

}

$(document).ready(function(){

	// Multimedia carousels
	$('.multimedia-carousel').each(function(){
		
		$this = $(this);


		$('.carousel-slides',$this).slick({
			arrows: false,
			dots: false,
			lazyLoad: 'ondemand',
			asNavFor: $('.carousel-thumbs',$this)
		});

		// Thumbnails
		$('.carousel-thumbs',$this).slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: $('.carousel-slides',$this),
			dots: false,
			arrows: false,
			centerMode: true,
			focusOnSelect: true
		});

		// Lazy loaded
		$('.carousel-slides',$this).on('lazyLoaded', function(event, slick, currentSlide, nextSlide){
			currentSlide.closest('.slide-poster').addClass('loaded');
		});

		// On before slide change
		$('.carousel-slides',$this).on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.slick-current').removeClass('active-media');

		});

		// On after slide change
		$('.carousel-slides',$this).on('afterChange', function(event, slick, currentSlide, nextSlide){
			$('.slide-object').empty();
			$('.slide').removeClass('active-media');

		});

	});

	$(document).keyup(function(e){
		if(e.keyCode==27){
			e.preventDefault();
			$slideObject.empty();
			$('.slide').removeClass('active-media');
		}
	});

	// Video triggers

	var player;

	$playButton = $('.play-button');
	
	$iframe = $('.slick-current iframe');

	$playButton.on('click', function(e) {

		e.preventDefault();

		$(this).closest('.slide').addClass('active-media');

		$iframe = $('.slick-current iframe');
		$slideType = $(this).closest('.slide').attr('data-type');
		$slideObject = $(this).closest('.slide').find('.slide-object');
		$videoId = $(this).closest('.slide').find('.video').attr('data-id');
		$embedUrl = $(this).closest('.slide').find('.iframe').attr('data-embed');

		if ( $slideType == 'youtube' ) {

			// Inject YouTube API script
			if ( !$('script[src="https://www.youtube.com/iframe_api"]').length ) {
			
				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			}

			if ( !$iframe.length ) {

				$slideObject.html('<iframe id="video" src="//www.youtube.com/embed/'+$videoId+'?&enablejsapi=1" frameborder="0" allowfullscreen allow-same-origin allow-scripts></iframe>');

				setTimeout(function(){
					
					youtube();

				}, 1000);

			}

		} else if ( $slideType == 'vimeo' ){

			// Inject Vimeo API script
			if ( !$('script[src="https://player.vimeo.com/api/player.js"]').length ) {
			
				var tag = document.createElement('script');
				tag.src = "https://player.vimeo.com/api/player.js";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			}

			if ( !$iframe.length ) {

				$slideObject.html('<iframe src="//player.vimeo.com/video/'+$videoId+'?autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

				setTimeout(function(){
					
					vimeo();

				}, 1000);

			}

		} else if ( $slideType == 'matterport' ){

			if ( !$iframe.length ) {

				$slideObject.html('<iframe src="'+$embedUrl+'" frameborder="0" allowfullscreen></iframe>');

				$('.slide .close-button').on('click', function(e){
					e.preventDefault();
					$slideObject.empty();
					$('.slide').removeClass('active-media');
				});

			}
		}
	});


});
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
				slidesToShow: 3,
				prevArrow: $('.previous-button', $this),
				nextArrow: $('.next-button', $this),
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '40px',
							slidesToShow: 1
						}
					}
				]
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
$(document).ready(function(){

	// Headroom
	$(".site-header").headroom({
	    // vertical offset in px before element is first unpinned
	    offset : 100,
	    // scroll tolerance in px before state changes
	    tolerance : 0,
	    // or you can specify tolerance individually for up/down scroll
	    tolerance : {
	        up : 5,
	        down : 10
	    },
	    // css classes to apply
	    classes : {
	        // when element is initialised
	        initial : "header",
	        // when scrolling up
	        pinned : "header-pinned",
	        // when scrolling down
	        unpinned : "header-unpinned",
	        // when above offset
	        top : "header-top",
	        // when below offset
	        notTop : "header-not-top",
	        // when at bottom of scoll area
	        bottom : "header-bottom",
	        // when not at bottom of scroll area
	        notBottom : "header-not-bottom"
	    },
	});

});
function maps() {
	
	/*
*  new_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery element)
*  @return	n/a
*/

function new_map( $el ) {

	// var
	var $markers = $el.find('.marker');
	
	
	// vars
	var args = {
		zoom		: 16,
		center		: new google.maps.LatLng(0, 0),
		mapTypeId	: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		mapTypeControl: false,
		streetViewControl: false,
		scrollwheel: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		styles: [
		    {
		        "featureType": "administrative",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "color": "#2a3151"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#fff7eb"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "elementType": "all",
		        "stylers": [
		            {
		                "saturation": -100
		            },
		            {
		                "lightness": 45
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "simplified"
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#2a3151"
		            },
		            {
		                "visibility": "on"
		            }
		        ]
		    }
		]
	};
	
	
	// create map	        	
	var map = new google.maps.Map( $el[0], args);
	
	
	// add a markers reference
	map.markers = [];
	
	
	// add markers
	$markers.each(function(i){
		
    	add_marker( $(this), map, infowindow, i );
		
	});

	// // center map
	center_map( map );

	// return
	return map;
	
}

// create info window
var infowindow = new google.maps.InfoWindow({
	content		: ""
});

/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$marker (jQuery element)
*  @param	map (Google Map object)
*  @return	n/a
*/

function add_marker( $marker, map, infowindow, i) {

	// var
	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

	var color = $marker.attr('data-color');

	// create marker
	var image = {
		url: '/content/themes/images/marker.svg',
		size: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(40/2, 40/2)
    }
    var markerCategory = $marker.attr('data-category');
	var marker = new google.maps.Marker({
		position	: latlng,
		map			: map,
		icon: {
			path: 'M37.5,61.5c8.2,0,15-6.8,15-15s-15-33-15-33s-15,24.8-15,33S29.3,61.5,37.5,61.5z',
	        fillColor: color,
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(37.5, 8),
	        strokeWeight: 0,
	        rotation: 180,
			fillOpacity: 1,
			scale: .75,
		}
        
	});

 	// Marker category variable
 	marker.markerCategory = $marker.attr('data-category');
 	marker.markerType = $marker.attr('data-type');
 	// marker.setVisible(false);



	// add to array
	map.markers.push( marker );

	// if marker contains HTML, add it to an infoWindow
	if( $marker.html() ) {

		// google.maps.event.addListenerOnce(map, 'tilesloaded', function(i){
		//  	infowindow.setContent($marker.html());
		//  	// infowindow.setContent($marker.html());
	 // 		infowindow.open(map, map.markers[1]);
	 // 		console.log($marker)
		// });

		// show info window when marker is clicked & close other markers
		google.maps.event.addListener(marker, 'click', function() {
			// map.setCenter(marker.getPosition());
			infowindow.close();
			infowindow.setContent($marker.html());
			infowindow.open(map, marker);
			
		});

		// // customize the infowindow
	 // 	google.maps.event.addListener(infowindow, 'domready', function() {

		// 	// Reference to the DIV that wraps the bottom of infowindow
		// 	var iwOuter = $('.gm-style-iw');

		// 	/* Since this div is in a position prior to .gm-div style-iw.
		// 	 * We use jQuery and create a iwBackground variable,
		// 	 * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
		// 	*/
		// 	var iwBackground = iwOuter.prev();

		// 	// Removes background shadow DIV
		// 	iwBackground.children(':nth-child(2)').css({'opacity' : '0', 'border-radius' : '100%'});

		// 	// Removes white background DIV
		// 	iwBackground.children(':nth-child(4)').css({'opacity' : '0', 'border-radius' : '100%'});

		// 	// // Moves the infowindow 115px to the right.
		// 	// iwOuter.parent().parent().css({left: '20px', top: '220px'});

		// 	// iwOuter.parent().css({left: '100px', top: '100px'});

		// 	// Moves the shadow of the arrow 76px to the left margin.
		// 	iwBackground.children(':nth-child(1)').css({'display': 'none'});

		// 	// Moves the arrow 76px to the left margin.
		// 	iwBackground.children(':nth-child(3)').css({'display': 'none'});

		// 	// Changes the desired tail shadow color.
		// 	iwBackground.children(':nth-child(3)').find('div').css({'display': 'none'});

		// 	// Reference to the div that groups the close button elements.
		// 	var iwCloseBtn = iwOuter.next();

		// 	// // Apply the desired effect to the close button
		// 	// iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

		// 	iwCloseBtn.addClass('close-btn');

		// 	// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		// 	if($('.iw-content').height() < 140){
		// 	  $('.iw-bottom-gradient').css({display: 'none'});
		// 	}

		// 	// The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
		// 	iwCloseBtn.mouseout(function(){
		// 	  $(this).css({opacity: '1'});
		// 	});
		// });

		// close info window when map is clicked
		google.maps.event.addListener(map, 'click', function(event) {
			if (infowindow) {
				infowindow.close();
			}
		});
		
	}

	// center map on browser resize
	google.maps.event.addDomListener(window, 'resize', function() {
	  var center = map.getCenter();
	  google.maps.event.trigger(map, 'resize');
	  map.setCenter(center); 
	});

	// google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
	//   infowindow.open(map, marker);
	// });

}

/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	map (Google Map object)
*  @return	n/a
*/

function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();

	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	// only 1 marker?
	if( map.markers.length == 1 )
	{
		// console.log('cool');
	  	google.maps.event.trigger(map.markers[0], 'click');
		// set center of map
	    map.setCenter( bounds.getCenter() );
	    map.setZoom( 4 );
	}
	else
	{	
		// Open first marker
		// google.maps.event.trigger(map.markers[1], 'click');
		map.setZoom(12);
		// Center to open mark
		// map.setCenter(map.markers[0].getPosition());
		// fit to bounds
		map.fitBounds( bounds );
	}

}

// popup is shown and map is not visible
google.maps.event.trigger(map, 'resize');

/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type	function
*  @date	8/11/2013
*  @since	5.0.0
*
*  @param	n/a
*  @return	n/a
*/
// global var
var map = null;

$(document).ready(function(){

	$('.map-container').each(function(){
		// create map
		map = new_map( $(this) );
		$(this).addClass('loaded');

	});

	$(document).on('click', '.map-filter a', function (e) {

		e.preventDefault();

	    $this = $(this);
	    // var type = $this.data('type');
	    $category = $this.data('category');

	    infowindow.close();

    	if(!$this.hasClass('active-category')){
    		
    		$('.map-filter a').removeClass('active-category');
	    	$this.addClass('active-category');

			for (var i=0; i<map.markers.length; i++) {
				if (map.markers[i].markerCategory !== $category && map.markers[i].markerType !== "default") {
				// map.markers[i].setAnimation(google.maps.Animation.DROP);
					map.markers[i].setVisible(false);
				} else {
					map.markers[i].setVisible(true);
				}
			}

		} else {

			$this.removeClass('active-category');

			for (var i=0; i<map.markers.length; i++) {
				
				map.markers[i].setVisible(true);
			}

		};

		// center map
		center_map( map );

    });

   

});
}
$(document).ready(function(){

	$menuGroup = $('.main-menu .menu');

	// Multi level push menu
	$(".main-menu .caret").on('click', function(e) {
		
		e.preventDefault();

		$this = $(this);

		// Breadcrumb wrapper
		$breadcrumbWrapper = $('.breadcrumb-wrapper');
		$breadcrumb = $('.breadcrumb');
		$breadcrumbText = $this.prev('.link-text');
		$breadcrumbText = $breadcrumbText.text();
		$breadcrumbItem = $('<a href="#" class="breadcrumb">'+$breadcrumbText+'</a>' );
		if( !$breadcrumbWrapper.length ) {

			$('<div class="breadcrumb-wrapper"></div>').insertBefore('.main-menu').append($breadcrumbItem);
			$breadcrumbHeight = $breadcrumbItem.height();

		} else {

			$breadcrumbWrapper.append($breadcrumbItem);
			$breadcrumbHeight = $breadcrumbItem.height();
		}

		console.log($breadcrumbHeight);
		$('.main-menu').css({top: $breadcrumbHeight});

		// Make "all" menus not active
		$menuGroup.removeClass('active-menu-group');

		// Make current menu clicked "inactive" by pushing it the back of the line
		$this.closest('.menu').addClass('inactive-menu-group');

		// Bring the next menu up to the front of the line and active
		$this.parent().next('.menu').addClass('active-menu-group');
		
	});
	
	// Breadcrumb triggers
	$(document).on( 'click', '.breadcrumb', function(e) {
		
		e.preventDefault();

		$this = $(this);
		
		$index = $this.index('.breadcrumb');
		$breadcrumbHeight = $this.outerHeight;
		$breadcrumbWrapper = $('.breadcrumb-wrapper');

		// Make "all" menus not active
		$menuGroup.removeClass('active-menu-group');
		$('.site-navigation').find('.menu').slice($index).removeClass('inactive-menu-group');
		$('.site-navigation').find('.menu').eq($index).removeClass('inactive-menu-group').addClass('active-menu-group');

		if( $this.is(':first-child') ) {

			$breadcrumbWrapper.fadeOut().remove();
			$('.main-menu').css({top: 0});

		} else {

			$this.fadeOut().remove();		

		}
		
	});

});
function sharingPopout () {

// Social sharing window
	
	$shareLink = $('.share-link');
	
	if( $shareLink.length ) {

		$('.share-module-trigger').on('click', function(e){

			e.preventDefault();

			var $this = $(this);
			
			$this.closest('.share-module').toggleClass('active-sharing');

		});
	    
	    $(document).on('click', '.share-link', function(e) {

	    	// e.preventDefault();
	    	// console.log('neat');

	        $url = this.href,
	            $width = 500,
	            $height = 300,
	            $left = (screen.width / 2) - ($width / 2),
	            $top = (screen.height / 2) - ($height / 2);

	        if(/^(f|ht)tps?:\/\//i.test($url) || /^mailto/i.test($url)) {
	            e.preventDefault();
	            window.open(
	                $url,
	                '',
	                'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + $width + ',height=' + $height + ',top=' + $top + ',left=' + $left
	            );
	        }

	    });
	}

}
$(document).ready(function(){

        // Accordion
        $scrollableTable = $('.scrollable-table');

        // Sets the states of the panels
        $scrollableTable.each(function() {

            $table = $(this);
            
            $table.scroll(function() {
                
                $currentTable = $(this);
                $distanceX = $table.scrollLeft();
                $distanceY = $table.scrollTop();
                
                if( !$currentTable.hasClass('scroll-y') ) {

                    $rowLabel = $table.find('tr th:first-child');
                    $columnLabel = $table.find('thead tr');
                    
                    if($distanceX > 0 ){

                        $currentTable.addClass('scroll-x');
                        $rowLabel.each(function(){
                            $(this).css({transform: 'translateX(' + $distanceX +'px)'});
                        });
                        
                    } else {

                        $currentTable.removeClass('scroll-x');

                    }

                }

                if( !$currentTable.hasClass('scroll-x') ) {

                    $rowLabel = $table.find('tbody tr th:first-child');
                    $columnLabel = $table.find('thead tr');

                    if($distanceY > 0 ){

                        $currentTable.addClass('scroll-y');
                        $columnLabel.each(function(){
                            $(this).css({transform: 'translateY(' + $distanceY +'px)'});
                        });
                       

                    } else {
                       
                        $currentTable.removeClass('scroll-y');

                    } 

                 }

            });

        });

});
$(document).ready(function(){

	// Remove loading class
	$('.tabs-component').each(function(){

		var $component = $(this);
		var $tabList = $component.find('.tab-list');
		var $tabPanel = $component.find('.tab-panel');
		var $tab = $component.find('.tab-list button')
		var $panelLabel = $component.find('.panel-label');

		if ($(window).width() > 768) {

			$tab.first().attr({"aria-selected": "true"}).addClass('active-tab');
			$tabPanel.first().attr({"aria-hidden": "true"}).addClass('active-content');

		}


		$tab.on('click', function(e){

			e.preventDefault();

			$this = $(this);

			$tabIndex = $this.index();
			$tabTarget = $tabPanel.eq($tabIndex);

			$tab.attr({"aria-selected": "false"}).removeClass('active-tab');
			$this.attr({"aria-selected": "true"}).addClass('active-tab');

			$tabPanel.attr({"aria-hidden": "false"}).removeClass('active-content');
			$tabTarget.attr({"aria-hidden": "true"}).addClass('active-content');

		});

		$panelLabel.on('click', function(e){

			e.preventDefault();

			$this = $(this);
			$labelTarget = $this.closest($tabPanel);

			if( $labelTarget.hasClass('active-content') ) {

				$labelTarget.attr({"aria-hidden": "false"}).removeClass('active-content');

			} else {

				$tabPanel.attr({"aria-hidden": "false"}).removeClass('active-content');
				$labelTarget.attr({"aria-hidden": "true"}).addClass('active-content');

				// Goes to the clicked item
	            setTimeout(function(){

	            	$headerHeight = $('.site-header').outerHeight();
	                
	                $('html, body').animate({
	                    scrollTop:$this.offset().top-$headerHeight
	                }, 300);

	            }, 300);

			}

		});

	});


});
function videos() {
	
	const players = Array.from($('.video-object')).map(player => new Plyr(player, {
		iconUrl: 'http://settlementmusic.localhost/content/themes/settlementmusic/img/spritemap.svg',
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
//# sourceMappingURL=maps/partials.js.map
