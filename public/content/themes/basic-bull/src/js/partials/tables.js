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
                
                if($distanceX > 0 ){

                    $rowLabel = $table.find('tr th:first-child');
                    $columnLabel = $table.find('thead tr');

                    if( !$currentTable.hasClass('scroll-y') ) {

                        $currentTable.addClass('scroll-x');
                        $rowLabel.each(function(){
                            $(this).css({transform: 'translateX(' + $distanceX +'px)'});
                        });
                        
                    } 

                } else {
                    $rowLabel.each(function(){
                        $(this).removeAttr('style');
                    });
                    $currentTable.removeClass('scroll-x');

                }

                if($distanceY > 0 ){

                    $rowLabel = $table.find('tbody tr th:first-child');
                    $columnLabel = $table.find('thead tr');
                    
                    if( !$currentTable.hasClass('scroll-x') ) {

                        $currentTable.addClass('scroll-y');
                        $columnLabel.each(function(){
                            $(this).css({transform: 'translateY(' + $distanceY +'px)'});
                        });
                       

                    }

                 } else {

                    $columnLabel.each(function(){
                        $(this).removeAttr('style');
                    });
                    $currentTable.removeClass('scroll-y');

                } 

            });

        });

});