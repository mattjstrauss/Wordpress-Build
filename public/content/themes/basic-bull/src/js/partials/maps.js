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