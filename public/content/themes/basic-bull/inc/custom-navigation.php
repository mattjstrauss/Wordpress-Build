<?php 

/*--------------------------------------------------------------
Register navigations
--------------------------------------------------------------*/

if ( ! function_exists( 'bull_navigation' ) ) {

	function bull_navigation() {
  
	  register_nav_menus( array(
		  'primary' => __( 'Primary Navigation', 'wpmu-theme' ),
		  'sidebar' => __( 'Sidebar Navigation', 'wpmu-theme' ),
		) );
	  
	}

	add_action( 'after_setup_theme', 'bull_navigation' );

}

?>