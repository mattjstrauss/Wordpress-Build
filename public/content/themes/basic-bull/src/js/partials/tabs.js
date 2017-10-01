$(document).ready(function(){

	// Remove loading class
	$('.tabs-component').each(function(){

		$tabList = $('.tab-list');
		$tabContent = $('.tab-content');
		$tab = $('.tab-list a')
		$contentLabel = $('.content-label');

		if ($(window).width() > 768) {

			$tab.first().attr({"aria-selected": "true"}).addClass('active-tab');
			$tabContent.first().attr({"aria-hidden": "true"}).addClass('active-content');

		}


		$tab.on('click', function(e){

			e.preventDefault();
			
			$this = $(this);

			$tabIndex = $tab.index($(this));
			$tabTarget = $tabContent.eq($tabIndex);

			$tab.attr({"aria-selected": "false"}).removeClass('active-tab');
			$this.attr({"aria-selected": "true"}).addClass('active-tab');

			$tabContent.attr({"aria-hidden": "false"}).removeClass('active-content');
			$tabTarget.attr({"aria-hidden": "true"}).addClass('active-content');

		});

		$contentLabel.on('click', function(e){

			e.preventDefault();

			$this = $(this);
			$labelTarget = $this.closest($tabContent);

			if( $labelTarget.hasClass('active-content') ) {

				$labelTarget.attr({"aria-hidden": "false"}).removeClass('active-content');

			} else {

				$tabContent.attr({"aria-hidden": "false"}).removeClass('active-content');
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