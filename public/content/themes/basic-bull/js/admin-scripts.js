$(document).ready(function(){

	// WP admin bar toggles
	$wpNavBar = $('#wpadminbar');
	$wpNavBar.addClass('hide');

	$('#admin-trigger').on('click', function(){

		$(this).toggleClass('down');
		$wpNavBar.toggleClass('hide show');

	});

});
//# sourceMappingURL=maps/admin-scripts.js.map
