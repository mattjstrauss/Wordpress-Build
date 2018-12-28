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
        $headerHeight = $('.header-search').outerHeight();
        
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
function audioPlayers() {

    if ( $('.audio-player').length ) {

        $('.audio-player').each(function(){
     
            var $audioPlayer = $(this);
            var $audioObject = $audioPlayer.find('audio')[0];
            var $currentTimeDisplay = $audioPlayer.find('.current-time span');
            var $totalTimeDisplay = $audioPlayer.find('.total-time span');
            var $currentTime = $audioObject.currentTime;
            var $playPauseButton = $audioPlayer.find('.track-play-pause');
            var $progressRange = $audioPlayer.find('.track-progress input[type="range"]');
            var $volumeRange = $audioPlayer.find('.track-volume input[type="range"]');
            var $volumeButton = $audioPlayer.find('.volumn-button');

            // Onces the audio is loaded
            if( $audioObject.readyState >= 1 ) {

                // Remove loading state once 100% loaded
                $audioPlayer.removeClass('loading');

                // Determine initial the audio track times
                var $audioLength = $audioObject.duration,
                    $minutes = parseInt($audioLength / 60, 10),
                    $seconds = parseInt($audioLength % 60),
                    $totalTime = $minutes + ":" + ($seconds < 10 ? "0" + $seconds : $seconds);
               
                // Update the time to show the audio tracks total duration
                $totalTimeDisplay.html($totalTime);

                // Set input max to be the audio duration value
                $progressRange.attr('max', Math.floor($audioLength));

                // Update the track time and input
                $progressRange.on('input', function(e){

                   var $min = e.target.min,
                      $max = e.target.max,
                      $val = e.target.value,
                      $inputPercentage = $val * 100 / $max;

                   // Update the value to be relative to the max which is the duration of the audio
                   $progressRange.attr('val', e.target.value);

                   // Update the fill of the input
                   $(this).css({
                      'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                   });

                   // Change the audio track to play based on the value of the input
                   $audioObject.currentTime = $val;

                });

                 // Update the track volumn and input
                $volumeRange.on('input', function(e){

                    var $min = e.target.min,
                        $max = e.target.max,
                        $val = e.target.value,
                        $inputPercentage = $val * 100 / $max;

                    // Update the value to be relative to the max which is the duration of the audio
                    $volumeRange.attr('val', e.target.value);

                    // Update the fill of the input
                    $(this).css({
                        'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                    });

                    // Change the audio track to play based on the value of the input
                    $audioObject.volume = $val;

                    if ( $val == 0 ) {

                        $audioPlayer.addClass('muted');

                    } else {

                        $audioPlayer.removeClass('muted');

                    }

                });

            } else {
                
                $audioObject.addEventListener('loadedmetadata', function (){

                    // Remove loading state once 100% loaded
                    $audioPlayer.removeClass('loading');

                    // Determine initial the audio track times
                    var $audioLength = $audioObject.duration,
                        $minutes = parseInt($audioLength / 60, 10),
                        $seconds = parseInt($audioLength % 60),
                        $totalTime = $minutes + ":" + ($seconds < 10 ? "0" + $seconds : $seconds);
                   
                    // Update the time to show the audio tracks total duration
                    $totalTimeDisplay.html($totalTime);

                    // Set input max to be the audio duration value
                    $progressRange.attr('max', Math.floor($audioLength));

                    // Update the track time and input
                    $progressRange.on('input', function(e){

                       var $min = e.target.min,
                          $max = e.target.max,
                          $val = e.target.value,
                          $inputPercentage = $val * 100 / $max;

                       // Update the value to be relative to the max which is the duration of the audio
                       $progressRange.attr('val', e.target.value);

                       // Update the fill of the input
                       $(this).css({
                          'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                       });

                       // Change the audio track to play based on the value of the input
                       $audioObject.currentTime = $val;

                    });

                     // Update the track volumn and input
                    $volumeRange.on('input', function(e){

                        var $min = e.target.min,
                            $max = e.target.max,
                            $val = e.target.value,
                            $inputPercentage = $val * 100 / $max;

                        // Update the value to be relative to the max which is the duration of the audio
                        $volumeRange.attr('val', e.target.value);

                        // Update the fill of the input
                        $(this).css({
                            'backgroundSize': Math.ceil($inputPercentage) + '% 100%'
                        });

                        // Change the audio track to play based on the value of the input
                        $audioObject.volume = $val;

                        if ( $val == 0 ) {

                            $audioPlayer.addClass('muted');

                        } else {

                            $audioPlayer.removeClass('muted');

                        }

                    });

                });

            }

             // Update values when the track time changes
             $audioObject.addEventListener('timeupdate', function (){

                var $currentTime = $audioObject.currentTime,
                    $audioLength = $audioObject.duration,
                    $playPercent = 100 * ($currentTime / $audioLength),
                    $currentHour = parseInt($currentTime / 3600) % 24,
                    $currentMinute = parseInt($currentTime / 60) % 60,
                    $currentSecondsLong = $currentTime % 60,
                    $currentSeconds = $currentSecondsLong.toFixed(),
                    $currentTimeFormat = ($currentMinute < 10 ? "" + $currentMinute : $currentMinute) + ":" + ($currentSeconds < 10 ? "0" + $currentSeconds : $currentSeconds);

                // Update the display of current play time
                $currentTimeDisplay.html($currentTimeFormat);

                // Update the range slider value to match (rounding down)
                $progressRange.attr('val', Math.floor($currentTime));

                 // If its not being played then do so, else pause
                if ( !$audioPlayer.hasClass('playing') ) {

                    // Update the appearance of the range slider to show progress
                    $progressRange.css({
                        'backgroundSize': Math.ceil($playPercent) + '% 100%'
                    });

                } else {

                    // Update the appearance of the range slider to show progress
                    $progressRange.css({
                        'backgroundSize': $playPercent + '% 100%'
                   });


                }  

            });

            // Update values when the track volume changes
            $audioObject.addEventListener('volumechange', function (){

                $volumeRange.attr('val', $audioObject.volume);

                $volumeRange.css({
                    'backgroundSize': Math.ceil($audioObject.volume * 100) + '% 100%'
                });

                if ( $audioObject.volume == 0 ) {

                    $audioPlayer.addClass('muted');

                } else {

                    $audioPlayer.removeClass('muted');

                }

            });

            $volumeButton.on('click', function(e){

                if( $audioObject.volume > 0) {

                    // Store current volumn to reset on unmute
                    $resetVolume = $audioObject.volume;
                    $audioObject.volume = 0;

                } else {

                    $audioObject.volume = $resetVolume;

                }

            });

             // When audio is paused remove class playing
             $audioObject.addEventListener('pause', function() {

                $audioPlayer.removeClass('playing');

             });

             // When audio is playing add class playing
             $audioObject.addEventListener('playing', function(e) {

                $audioPlayer.addClass('playing');

                // Pause all "other" audio tracks
                $.each($('audio'), function () {

                      if(this != e.target){
                      this.pause();
                   }

                });

             });

             // When audio has finished playing reset
             $audioObject.addEventListener('ended', function() {

                $audioPlayer.removeClass('playing');

                $audioObject.currentTime = 0;

             });

             // When play/pause UI has been clicked
             $playPauseButton.on('click', function(e){

                e.preventDefault();

                // Pause all "other" audio tracks
                $.each($('audio'), function () {
                      this.pause();
                });

                // If its not being played then do so, else pause
                if ( !$audioPlayer.hasClass('playing') ) {

                   $audioObject.play();

                } else {

                   $audioObject.pause();

                }  

             });

        });

    }

};
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
function imgToInlineSvg() {

    $('img.inline-svg').each(function(){

        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
     
        $.get(imgURL, function(data) {
            /* Get the SVG tag, ignore the rest */
            var $svg = $(data).find('svg');
     
            /* Add replaced image's ID to the new SVG */
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
     
            /* Add replaced image's classes to the new SVG */
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
     
            /* Remove any invalid XML tags as per http://validator.w3.org */
            $svg = $svg.removeAttr('xmlns:a');
     
            /* Replace image with new SVG */
            $img.replaceWith($svg);
     
        }, 'xml');
     
    });

    // $.get("/content/themes/settlementmusic/img/spritemap.svg", function(data) {
    //   var div = document.createElement("div");
    //   div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
    //   div.style.display='none';
    //   document.body.insertBefore(div, document.body.childNodes[0]);
    // });

}
function maps() {

	if($('.map-container').length) {
	
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
		scrollwheel: false,
		zoomControlOptions: {
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		styles: [
		    {
		        "featureType": "all",
		        "elementType": "labels.text.fill",
		        "stylers": [
		            {
		                "saturation": 36
		            },
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 40
		            }
		        ]
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels.text.stroke",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 16
		            }
		        ]
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 20
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 17
		            },
		            {
		                "weight": 1.2
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 20
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 21
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry.fill",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 17
		            }
		        ]
		    },
		    {
		        "featureType": "road.highway",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 29
		            },
		            {
		                "weight": 0.2
		            }
		        ]
		    },
		    {
		        "featureType": "road.arterial",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 18
		            }
		        ]
		    },
		    {
		        "featureType": "road.local",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 16
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 19
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#000000"
		            },
		            {
		                "lightness": 17
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
	    map.setZoom( 16 );
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

};
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

		} 
	});


});
function navigation() {

	$('.main-menu').addClass('active-menu-group');

	$('.menu-button').on('click', function(e){
		
		e.preventDefault();

		var $closeMenu = function(){
			$('body').removeClass('open-navigation').addClass('closed-navigation');
		}

		if($('body').hasClass('open-navigation') ){
			
			if ($('.main-menu').length){

				var navTl = new TimelineLite();
				$items = $('.active-menu-group > li, .breadcrumb-wrapper');
				navTl.staggerFromTo($items, 0.65, {
					opacity: 1,
					marginLeft: "0px",
					ease: Expo.easeOut
				}, {
					opacity: 0,
					marginLeft: "-20px",
					ease: Expo.easeOut, 
					onComplete: $closeMenu,
				}, -0.1);

			} else {

				// $('body').removeClass('open-navigation').addClass('closed-navigation');

			}
			console.log("not else");

		} else {

			$('body').removeClass('closed-navigation').addClass('open-navigation');
			// Stagger animations	
			var navTl = new TimelineLite();
			$items = $('.active-menu-group > li, .breadcrumb-wrapper');
			navTl.staggerFromTo($items, 0.5, {
				opacity: 0,
				marginLeft: "-20px",
				ease: Expo.easeOut
			}, {
				opacity: 1,
				marginLeft: "0px",
				ease: Expo.easeOut
			}, 0.1);

		}

	});

	$('.settings-button').on('click', function(e){

		e.preventDefault();
		$('.site-utilities').toggleClass('active-utilities');

	});
	// if($(window).width() > 767) {
	// 	$('body').removeClass('closed-navigation');
	// }

}

function multiLevelPush() {

	$menuGroup = $('.menu');

	// Multi level push menu
	$('.main-menu .expandable-link .caret, .expandable-menu > a .caret').on('click', function(e) {
		
		e.preventDefault();

		$this = $(this).closest('a');

		// Breadcrumb wrapper
		$breadcrumbWrapper = $('.breadcrumb-wrapper');
		$breadcrumb = $('.breadcrumb');
		// $breadcrumbText = $this.prev('.link-text');
		$breadcrumbText = $this.find('.link-text');
		$breadcrumbText = $breadcrumbText.text();
		$breadcrumbItem = $('<a href="#" class="breadcrumb">'+$breadcrumbText+'</a>' );
		if( !$breadcrumbWrapper.length ) {

			$('<div class="breadcrumb-wrapper"></div>').prependTo('.site-navigation').first().append($breadcrumbItem);
			$breadcrumbHeight = $breadcrumbItem.height();

		} else {

			$breadcrumbWrapper.append($breadcrumbItem);
			$breadcrumbHeight = $breadcrumbItem.height();
		}

		// console.log($breadcrumbHeight);
		$('.main-menu').css({top: $breadcrumbHeight});

		// Make "all" menus not active
		$menuGroup.removeClass('active-menu-group');

		// Make current menu clicked "inactive" by pushing it the back of the line
		$inactiveMenu = $this.closest('.menu');
		$inactiveMenu.addClass('inactive-menu-group');
		// TweenMax.to($inactiveMenu, 0.2, {x:"-100%"});

		// Bring the next menu up to the front of the line and active
		// $activeMenu = $this.parent().next('.menu');
		$activeMenu = $this.next('.menu');
		$activeMenu.addClass('active-menu-group');
		
		var navTl = new TimelineLite();
		$items = $('.active-menu-group > li, .breadcrumb-wrapper');
		navTl.staggerFromTo($items, 0.5, {
			opacity: 0,
			marginLeft: "20px",
			ease:Expo.easeOut
		}, {
			opacity: 1,
			marginLeft: "0px",
			ease:Expo.easeOut
		}, 0.1);
		
	});

	$('.main-menu .current-page').on('click', function(e){
		e.preventDefault();
	});

	$('.main-menu a').on('click', function(e){
		$listItem = $(this).closest('li');
		$('.main-menu li').removeClass('current-page');
		$listItem.addClass('current-page');
	})
	
	// Breadcrumb triggers
	$(document).on( 'click', '.breadcrumb', function(e) {
		
		e.preventDefault();

		$this = $(this);
		
		$index = $this.index('.breadcrumb');
		$breadcrumbHeight = $this.outerHeight;
		$breadcrumbWrapper = $('.breadcrumb-wrapper');

		// Make "all" menus not active
		$menuGroup.removeClass('active-menu-group');
		$('.site-navigation').find('.inactive-menu-group').eq($index).removeClass('inactive-menu-group').addClass('active-menu-group');

		console.log($index);

		var navTl = new TimelineLite();
		$items = $('.active-menu-group > li, .breadcrumb-wrapper');
		navTl.staggerFromTo($items, 0.5, {
			opacity: 0,
			marginLeft: "-20px",
			ease:Expo.easeOut
		}, {
			opacity: 1,
			marginLeft: "0px",
			ease:Expo.easeOut
		}, 0.1);

		if( $this.is(':first-child') ) {

			$breadcrumbWrapper.fadeOut().remove();
			$('.main-menu').css({top: 0});

		} else {

			$this.fadeOut().remove();		

		}
		
	});

}
function sharingPopout () {

// Social sharing window
	
	$shareLink = $('.share-link');
	
	if( $shareLink.length ) {

		$('.share-module-trigger').on('click', function(e){

			e.preventDefault();

			var $this = $(this);
			
			$this.closest('.share-module').toggleClass('active-sharing');

		});
	    
	    $shareLink.each(function(){
	    
	    	$(this).on('click', function(e) {

		    	e.preventDefault();

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
function tabs() {

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

}
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
//# sourceMappingURL=maps/partials.js.map
