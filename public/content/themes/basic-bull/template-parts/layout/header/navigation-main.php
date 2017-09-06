<?php 

    $menu_name = 'primary';

    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) :

?>
    
    <div id="primary-navigation" class="menu main-menu" role="navigation">
        
        <?php

            $menu = get_term( $locations[$menu_name] );

            $menu_items = wp_get_nav_menu_items($menu->term_id);

            $main_menu = "";

            $main_menu .= '<ul class="main-nav">';

            $postId = get_the_ID();
            $postParentId = wp_get_post_parent_id($postId);
     
            $count = 0;
            $submenu = false;

            foreach( $menu_items as $menu_item ) {
                $title = $menu_item->title;
                $url = $menu_item->url;
                $slug = $menu_item->slug;
                $target = $menu_item->target;
                $classes = $menu_item->classes;
                $class = implode(" ", $classes);
                //Lower case everything
                $data = strtolower($title);
                //Make alphanumeric (removes all other characters)
                $data = preg_replace("/[^a-z0-9_\s-]/", "", $data);
                //Clean up multiple dashes or whitespaces
                $data = preg_replace("/[\s-]+/", " ", $data);
                //Convert whitespaces and underscore to dash
                $data = preg_replace("/[\s_]/", "-", $data);
                // Gather children
                $children = get_children($menu_item->object_id);
                $hasChildren = "";

                if ( !$menu_item->menu_item_parent ) {
                    
                    $parent_id = $menu_item->ID;

                    if ( count( $children ) > 0 ) {
                        $hasChildren = "parent-item";
                    }


                    if( $postId == $menu_item->object_id || $postParentId == $menu_item->object_id) {

                        $main_menu .= '<li class="menu-item current-page '. $data .' '. $hasChildren .'">';
                        $main_menu .= '<a href="'.$url.'" target="'. $target .'"><span class="menu-item-text">' . $title . '</span></a>';

                    } else {

                        $main_menu .= '<li class="menu-item '. $data .' '. $hasChildren .'">';
                        $main_menu .= '<a href="'.$url.'" target="'. $target .'"><span class="menu-item-text">' . $title . '</span></a>';
                    }

                } 

                if ( $parent_id == $menu_item->menu_item_parent ) {

                    if ( !$submenu ) {
                        $submenu = true;
                        $main_menu .= '<ul class="sub-menu">';
                    }
         
                       if( $postId == ($menu_item->object_id )) {

                            $main_menu .= '<li class="menu-item child-item current-page '. $data .'">';
                            $main_menu .= '<a href="'.$url.'" target="'. $target .'"><span class="menu-item-text">' . $title . '</span></a>';
                            $main_menu .= '</li>';

                        } else {

                            $main_menu .= '<li class="menu-item child-item '. $data .'">';
                            $main_menu .= '<a href="'.$url.'" target="'. $target .'"><span class="menu-item-text">' . $title . '</span></a>';
                            $main_menu .= '</li>';
                        }
         
                    if ( !isset($menu_items[ $count + 1 ]) || $menu_items[ $count + 1 ]->menu_item_parent != $parent_id && $submenu ){
                        $main_menu .= '</ul>';
                        $submenu = false;
                    }
         
                }
         
                if (  !isset($menu_items[ $count + 1 ]) || $menu_items[ $count + 1 ]->menu_item_parent != $parent_id ) { 
                    $main_menu .= '</li>';      
                    $submenu = false;
                }
         
                $count++;

            }

            $main_menu .= '</ul>';

            echo $main_menu;

        ?>

    </div>

<?php endif; ?>