$(document).ready(function(){

	$menuGroup = $('.main-menu .menu');

	// Multi level push menu
	$(".main-menu .caret").on('click', function(e) {
		e.preventDefault();

		// Get link text and create "breadcrumb" item
		$breadcrumbItem = $(this).prev('.link-text');
		$breadcrumbText = $breadcrumbItem.text();
		$('<a href="#" class="breadcrumb">'+$breadcrumbText+'</a>' ).insertBefore('.main-menu');

		// Make "all" menus not active
		$menuGroup.removeClass('active-menu-group');

		// Make current menu clicked "inactive" by pushing it the back of the line
		$(this).closest('.menu').addClass('inactive-menu-group');

		// Bring the next menu up to the front of the line and active
		$(this).parent().next('.menu').addClass('active-menu-group');
		
	});

	$(document).on( 'click', '.breadcrumb', function(e) {
		
		$index = $(this).index('.breadcrumb');
		console.log($index);

		// Make "all" menus not active
		$menuGroup.removeClass('active-menu-group');
		$('.site-navigation').find('.menu').slice($index).removeClass('inactive-menu-group');
		$('.site-navigation').find('.menu').eq($index).removeClass('inactive-menu-group').addClass('active-menu-group');

		$(this).nextAll('.breadcrumb').fadeOut().remove();
		$(this).fadeOut().remove();
		
	});

});