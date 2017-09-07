<?php
    wp_nav_menu( array(
        'menu'              => 'primary',
        'theme_location'    => 'primary',
        'depth'             => 4,
        'walker'            => new Custom_Menu_Walker())
    );
?>