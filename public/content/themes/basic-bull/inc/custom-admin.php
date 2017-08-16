<?php 

/*--------------------------------------------------------------
Custom admin abilities
--------------------------------------------------------------*/

if ( ! function_exists( 'bull_custom_admin' ) ) {

	function bull_custom_admin() {

		// Make the admin logo on login link go the the site url instead of wordpress.org

		function my_login_logo_url() {

			return get_bloginfo( 'url' );

		}

		add_filter( 'login_headerurl', 'my_login_logo_url' );

		// Custom title text for the admin logo on login

		function my_login_logo_url_title() {

			return get_bloginfo( 'name' );

		}

		add_filter( 'login_headertitle', 'my_login_logo_url_title' );

		// Adds compiled stylesheet from src/css/admin/~

		function custom_login() {
			
			echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/css/admin-style.css" />';

		}

		add_action('login_head', 'custom_login');

		// Removes admin margin-top for the hidden admin bar

		add_action('get_header', 'my_filter_head');

		function my_filter_head() {
			
			remove_action('wp_head', '_admin_bar_bump_cb');

		}

	}

	add_action( 'after_setup_theme', 'bull_custom_admin' );


	// Adds compiled admin scripts and styles for the "frontend" when user is logged in

	if ( is_user_logged_in() ) {
		
		function bull_admin_styles() {

			wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/css/admin-style.css' );
		}

		add_action("admin_enqueue_scripts", "bull_admin_styles", 11);

		function bull_admin_scripts() {
			
			wp_enqueue_script('admin_scripts', get_template_directory_uri() . '/js/admin-scripts.js', array( 'jquery' ), false, true);
		}

		add_action("wp_enqueue_scripts", "bull_admin_scripts", 11);

	}

}

?>