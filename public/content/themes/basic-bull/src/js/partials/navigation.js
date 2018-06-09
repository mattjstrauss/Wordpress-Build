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

				$('body').removeClass('open-navigation').addClass('closed-navigation');

			}

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

			$('<div class="breadcrumb-wrapper"></div>').prependTo('.main-navigation').first().append($breadcrumbItem);
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