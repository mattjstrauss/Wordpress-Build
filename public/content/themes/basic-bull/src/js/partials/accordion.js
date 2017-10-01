$(document).ready(function(){

        // Accordion
        $accordion = $('.accordion-component')
        $accordionPanel = $('.accordion-panel');
        $panelLabel = $('.panel-label');
        $panelContent = $('.panel-content');

        $accordionPanel.each(function() {
            
            $this = $(this);
            
            $this.addClass('closed');
    
            if ( $this.hasClass('closed') ) {

                $currentPanelContent = $this.find('.panel-content');

                TweenMax.to($currentPanelContent, 0, {
                    height: 0
                });

            }
    
        });

        $panelLabel.on('click', function(e){
            
            e.preventDefault();

            $this = $(this);
            $currentPanelContent = $this.next('.panel-content');
            $currentPanel = $this.parent('.accordion-panel');
            $headerHeight = $('.site-header').outerHeight();
            
            function setHeight(){
                  TweenMax.from($currentPanelContent, 0.3, { height: 0 });
            }

            if ( $currentPanel.hasClass('closed') ) {
                
                // Closes "all" panels
                $accordionPanel.removeClass('open').addClass('closed');
                TweenMax.to($panelContent, 0.3, { height: 0 });

                // Opens this panel
			    $currentPanel.removeClass("closed").addClass("open");
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
               
                TweenMax.to($currentPanelContent, 0.2, { height: 0 });
                $currentPanel.addClass("closed").removeClass("open");

            }
    

        });

});