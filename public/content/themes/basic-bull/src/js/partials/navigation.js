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