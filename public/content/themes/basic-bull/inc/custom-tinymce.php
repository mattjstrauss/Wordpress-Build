<?php 

/*--------------------------------------------------------------
Custom TinyMCE formats
--------------------------------------------------------------*/

if ( ! function_exists( 'basic_bull_custom_tinymce' ) ) {

	function basic_bull_custom_tinymce() {

		// Custom TinyMCE format styles
		function my_theme_add_editor_styles() {
		    add_editor_style( 'css/admin-style.css' );
		}
		add_action( 'init', 'my_theme_add_editor_styles' );

		// Callback function to insert 'styleselect' into the $buttons array
		function my_mce_buttons_2( $buttons ) {
			array_unshift( $buttons, 'styleselect' );
			return $buttons;
		}
		// Register our callback to the appropriate filter
		add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

		/*
		* Callback function to filter the MCE settings
		*/

		function my_mce_before_init_insert_formats( $init_array ) {  

		// Define the style_formats array

			$style_formats = array(  
		/*
		* Each array child is a format with it's own settings
		* Notice that each array has title, block, classes, and wrapper arguments
		* Title is the label which will be visible in Formats menu
		* Block defines whether it is a span, div, selector, or inline style
		* Classes allows you to define CSS classes
		* Wrapper whether or not to add a new block-level element around any selected elements
		*/
		
				array(  
					'title' => 'Underline Text',  
					'block' => 'span',  
					'classes' => 'underline',
					'wrapper' => true,
				),
				array(  
					'title' => 'Red Button',  
					'block' => 'span',  
					'classes' => 'button red-button',
					'wrapper' => true,
				),
				array(  
					'title' => 'Blue Button',  
					'block' => 'span',  
					'classes' => 'button blue-button',
					'wrapper' => true,
				),
				array(  
					'title' => 'Blockquote Cite',  
					'inline' => 'cite',  
					'classes' => 'cite',
					'wrapper' => true,
				),
			);  
			// Insert the array, JSON ENCODED, into 'style_formats'
			$init_array['style_formats'] = json_encode( $style_formats );  
			
			return $init_array;  
		  
		} 
		// Attach callback to 'tiny_mce_before_init' 
		add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

	}

	add_action( 'after_setup_theme', 'basic_bull_custom_tinymce' );

}

?>