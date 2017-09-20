$(document).ready(function(){

	// Remove loading class
	$('body').removeClass('loading');


});
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
$(document).ready(function(){

	// Multi level push menu
	$(".main-menu .caret").on('click', function(e) {
		e.preventDefault();
		$breadcrumbItem = $(this).prev('.link-text');
		$breadcrumbText = $breadcrumbItem.text();
		$('.menu').removeClass('active-menu-group');
		$(this).closest('.menu').addClass('inactive-menu-group');
		$(this).parent().next('.menu').addClass('active-menu-group');
		$('<a href="#" class="breadcrumb">'+$breadcrumbText+'</a>' ).insertBefore('.main-menu');
	});

	$(document).on( 'click', '.breadcrumb', function(e) {
		$index = $(this).index('.breadcrumb');
		console.log($index);
		if( $(this).nextAll('.breadcrumb').length ) {
			$(this).nextAll('.breadcrumb').fadeOut().remove();
		} else {
			$(this).fadeOut().remove();
		}
	});

});
//# sourceMappingURL=maps/scripts.js.map
