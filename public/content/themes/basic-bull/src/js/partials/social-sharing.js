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