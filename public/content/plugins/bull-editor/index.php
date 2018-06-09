<?php
/**
 * Plugin Name:       Custom TinyMCE Editor by Bull Interactive
 * Description:       A plugin that replaces the default WYSIWYG editor TinyMCE buttons, formats and styles
 * Version:           1.0.0
 * Author:            By Bull Interactive 
 * License:           GPL-2.0+
 * Text Domain:       personalize-login
 */

if ( ! function_exists( 'bull_custom_tinymce' ) ) {

	function bull_custom_tinymce() {

		// TinyMCE: First line toolbar customizations
		// Button options can be found here: https://www.tinymce.com/docs/advanced/editor-control-identifiers/#menucontrols
		if( !function_exists('base_extended_editor_mce_buttons') ){

			function base_extended_editor_mce_buttons($buttons) {

				// The settings are returned in this array. Customize to suite your needs.
				return array(
					'styleselect',
					'bold',
					'italic',
					'underline',
					'bullist',
					'numlist',
					'alignleft', 
					'aligncenter',
					'alignright',
					'alignjustify',
					'outdent', 
					'indent', 
					'forecolor',
					'link',
					'unlink',
					// 'blockquote', 
					'hr',
					'pastetext',
					// 'spellchecker',
					'removeformat',
					'strikethrough',
					// 'superscript',
					// 'subscript',
					// 'charmap',
					// 'wp_more', 
					// 'wp_adv',
					// 'undo',
					// 'redo',
					// 'dfw',
				);
				/* WordPress Default
				return array(
					'bold', 'italic', 'strikethrough', 'separator', 
					'bullist', 'numlist', 'blockquote', 'separator', 
					'justifyleft', 'justifycenter', 'justifyright', 'separator', 
					'link', 'unlink', 'wp_more', 'separator', 
					'spellchecker', 'fullscreen', 'wp_adv', 'subscript', 'superscript'
				); */
			}
			
			add_filter("mce_buttons", "base_extended_editor_mce_buttons", 0);

		}


		// TinyMCE: Second line toolbar customizations
		if( !function_exists('base_extended_editor_mce_buttons_2') ){
			
			function base_extended_editor_mce_buttons_2($buttons) {
				
				// The settings are returned in this array. Customize to suite your needs. An empty array is used here because I remove the second row of icons.
				return array();
				
				// WordPress Default
				// return array(
				// 	'formatselect', 'underline', 'justifyfull', 'forecolor', 'separator', 
				// 	'pastetext', 'pasteword', 'removeformat', 'separator', 
				// 	'media', 'charmap', 'separator', 
				// 	'outdent', 'indent', 'separator', 
				// 	'undo', 'redo', 'wp_help'
				// ); 

			}

			add_filter("mce_buttons_2", "base_extended_editor_mce_buttons_2", 0);

		}

		// Add and format brand colors as a dropdown
		function my_mce4_options( $init ) {
			
			$default_colours = '
				"000000", "Black",
				"121212", "Dark Gray",
				"1c1c1c", "Gray",
				"f5f5f5", "Light Gray",
				"ff5a5f", "Pink",
				"fff7eb", "Beige",
				"2a3151", "Blue",
			';

			$custom_colours = '';
			$init['textcolor_map'] = '['.$default_colours.']';
			$init['textcolor_rows'] = 2;
			$init['textcolor_cols'] = 4;

			return $init;
		}

		add_filter('tiny_mce_before_init', 'my_mce4_options');

		// Remove custom colors options
		function wpse_tiny_mce_remove_custom_colors( $plugins ) {       

		    foreach ( $plugins as $key => $plugin_name ) {
		        if ( 'colorpicker' === $plugin_name ) {
		            unset( $plugins[ $key ] );
		            return $plugins;            
		        }
		    }

		    return $plugins;            
		}

		add_filter( 'tiny_mce_plugins', 'wpse_tiny_mce_remove_custom_colors' );

		// Custom TinyMCE format styles
		function my_theme_add_editor_styles() {

		    add_editor_style( 'css/admin-style.css' );

		}

		add_action( 'init', 'my_theme_add_editor_styles' );

		// Enable font size & font family selects in the editor
		if ( ! function_exists( 'typography_options' ) ) {
			
			function typography_options( $buttons ) {
				array_unshift( $buttons, 'fontselect' );
				array_unshift( $buttons, 'fontsizeselect' );
				array_unshift( $buttons, 'forecolor');
				return $buttons;
			}

		}
		// add_filter( 'mce_buttons_3', 'typography_options' );

		// Callback function to insert 'styleselect' into the $buttons array
		function format_options( $buttons ) {
			array_unshift( $buttons, 'styleselect' );
			return $buttons;
		}

		// Register our callback to the appropriate filter
		// add_filter( 'mce_buttons_3', 'format_options' );

		/*
		* Callback function to filter the MCE settings
		*/

		function my_mce_before_init_insert_formats( $init_array ) {  

		// Define the style_formats array

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
				'title' => 'Headers',
		    	'items' => array(
				    array(  
						'title' => 'X-Large',  
						'block' => 'h1',  
						'wrapper' => false,
					),
					array(  
						'title' => 'Large',  
						'block' => 'h2',  
						'wrapper' => false,
					),
					array(  
						'title' => 'Medium',  
						'block' => 'h3',  
						'wrapper' => false,
					),
					array(  
						'title' => 'Small',  
						'block' => 'h4',  
						'wrapper' => false,
					),
					array(  
						'title' => 'Extra Small',  
						'block' => 'h5',  
						'wrapper' => false,
					),
					array(  
						'title' => 'LABEL',  
						'block' => 'h6',  
						'wrapper' => false,
					),
				)
			),
			array(  
				'title' => 'Paragraph',  
				'block' => 'p',  
				'wrapper' => false,
			),
			array(
				'title' => 'Lists',
		    	'items' => array(
				    array(  
						'title' => 'Roman Numerals (I, II, III, etc.)',  
						'wrapper' => false,
						'selector' => 'ol',
						'classes' => 'upper-roman-list'
					),
					array(  
						'title' => 'Roman Numerals (i, ii, iii, etc.)', 
						'wrapper' => false,
						'selector' => 'ol',
						'classes' => 'lower-roman-list'
					),
					array(  
						'title' => 'Alphabetical (a, b, c, etc.)', 
						'wrapper' => false,
						'selector' => 'ol',
						'classes' => 'lower-alpha-list'
					),
					array(  
						'title' => 'Alphabetical (A, B, C, etc.)',  
						'wrapper' => false,
						'selector' => 'ol',
						'classes' => 'upper-alpha-list'
					),
					array(  
						'title' => 'Circle',  
						'wrapper' => false,
						'selector' => 'ul',
						'classes' => 'circle-list'
					),
					array(  
						'title' => 'Square',  
						'wrapper' => false,
						'selector' => 'ul',
						'classes' => 'square-list'
					),
				)
			),
			array(
	            'title' => 'Links',
	            'items' => array(
					array(  
						'title' => 'Pink Button',
						'selector' => 'a',
						'classes' => 'button pink-button',
					),
					array(  
						'title' => 'Blue Button',  
						'selector' => 'a',
						'classes' => 'button blue-button',
					),
					array(
						'title' => 'Beige Button',
						'selector' => 'a',
						'classes' => 'button beige-button',
					),
					array(
						'title' => 'Gray Button',
						'selector' => 'a',
						'classes' => 'button gray-button',
					),
					array(  
						'title' => 'Transparent Pink Button',
						'selector' => 'a',
						'classes' => 'button trans-pink-button',
					),
					array(  
						'title' => 'Transparent Blue Button',
						'selector' => 'a',
						'classes' => 'button trans-blue-button',
					),
					array(  
						'title' => 'Transparent Beige Button',
						'selector' => 'a',
						'classes' => 'button trans-beige-button',
					),
					array(  
						'title' => 'Transparent Gray Button',
						'selector' => 'a',
						'classes' => 'button trans-gray-button',
					),
					array(
						'title' => 'Arrow Link',  
						'selector' => 'a',
						'classes' => 'arrow-link pink-link',
					),
				)
            ),
		 	array(
				'title' => 'Blockquotes',
				'items' => array(
					array(  
						'title' => 'Quote',  
						'block' => 'blockquote',  
						'classes' => 'blockquote',
						'wrapper' => true,
					),
					array(  
						'title' => 'Cite or Source',  
						'inline' => 'span',  
						'selector' => 'blockquote',
						'classes' => 'cite',
						'styles' => array(
                			'fontWeight'    => 'bold',
            			)
					),
				)
			),
			array(
				'title' => 'Q&A',
				'items' => array(
					array(  
						'title' => 'Question',  
						'block' => 'div',
						'classes' => 'question',
						'wrapper' => true,
					),
					array(  
						'title' => 'Answer',  
						'block' => 'div',
						'classes' => 'answer',
						'wrapper' => true,
					),
				)
			),
			array(
				'title' => 'Other Formats',
				'items' => array(
					array(  
						'title' => 'Sans Serif',  
						'block' => 'div',  
						'classes' => 'sans-serif',
						'wrapper' => true,
					),
					array(  
						'title' => 'Serif',  
						'block' => 'div',  
						'classes' => 'serif',
						'wrapper' => true,
						'styles' => array(
							'fontFamily'    => 'serif',
						),
					),
				)
			)
		);  

			// Insert the array, JSON ENCODED, into 'style_formats'
			$init_array['style_formats'] = json_encode( $style_formats );  
			
			return $init_array;  
		  
		} 

		// Attach callback to 'tiny_mce_before_init' 
		add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );


		add_action( 'init', 'bull_buttons' );
		function bull_buttons() {
		    add_filter( "mce_external_plugins", "bull_add_buttons" );
		    add_filter( 'mce_buttons', 'bull_register_buttons' );
		}
		function bull_add_buttons( $plugin_array ) {
			$plugin_dir_path = dirname(__FILE__);
		    $plugin_array['bull'] = plugins_url() . '/bull-editor/js/scripts.js';
		    return $plugin_array;
		}
		function bull_register_buttons( $buttons ) {
		    array_push( $buttons, 'dropcap', 'showrecent' ); // dropcap', 'recentposts
		    return $buttons;
		}

		// Shortcode to create tooltips
		// ==================================
 
		function bull_tooltip ( $atts, $content = null ) {
			
			$tooltip = '';

				extract(shortcode_atts(array(
			        "position" => "top-left",
			        "title" => "title",
			    ), $atts));

			    $tooltip .= '<a href="#" class="tooltip '.$position.'" data-tooltip="'.$title.'">'.$content.'</a>';

			return $tooltip;
		} 

		add_shortcode( 'tooltip', 'bull_tooltip' );

	}

	add_action( 'after_setup_theme', 'bull_custom_tinymce' );

}