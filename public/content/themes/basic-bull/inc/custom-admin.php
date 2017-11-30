<?php 

/*--------------------------------------------------------------
Custom admin abilities
--------------------------------------------------------------*/

if ( ! function_exists( 'basic_bull_custom_admin' ) ) {

	function basic_bull_custom_admin() {

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

	add_action( 'after_setup_theme', 'basic_bull_custom_admin' );


	// Adds compiled admin scripts and styles for the "frontend" when user is logged in

	if ( is_user_logged_in() ) {
		
		function basic_bull_custom_backend_styles() {

			wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/css/admin-style.css' );
		}

		add_action("admin_enqueue_scripts", "basic_bull_custom_backend_styles", 11);

		function basic_bull_custom_admin_scripts_and_styles() {

			wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/css/admin-style.css' );
			
			wp_enqueue_script('admin_scripts', get_template_directory_uri() . '/js/admin-scripts.js', array( 'jquery' ), false, true);
		}

		add_action("wp_enqueue_scripts", "basic_bull_custom_admin_scripts_and_styles", 11);

	}

	// Adds custom columns for page views with ACF
	// ==================================

	function page_views_column($columns) {
		$columns = array(
			'cb'	 		=> '<input type="checkbox" />',
			// 'thumbnail'		=>	'Thumbnail',
			'title' 		=> 'Title',
			'page_views' 	=> 'Page Views',
			'date'			=>	'Date',
		);
		return $columns;
	}

	// Sets the value to the custom columns for page views with ACF
	// ==================================

	function my_custom_columns($column) {
	
		if($column == 'page_views') {

			if(get_field('page_views')) {
				
				$value = get_field('page_views');
				echo $value;

			} else {

				echo '0';

			}
		}
	}

	add_action('manage_pages_custom_column','my_custom_columns', 10, 2 );
	add_filter( 'manage_pages_columns', 'page_views_column' );

	// Makes the custom columns for page views with ACF sortable
	// ==================================

	function my_column_register_sortable( $columns ) {
		$columns['page_views'] = 'page_views';
		return $columns;
	}

	add_filter("manage_edit-page_sortable_columns", "my_column_register_sortable" );

	add_action( 'pre_get_posts', 'page_view_orderby' );
	function page_view_orderby( $query ) {
	    if( ! is_admin() )
	        return;
	 
	    $orderby = $query->get( 'orderby');
	 
	    if( 'page_views' == $orderby ) {
	        $query->set('meta_key','page_views');
	        $query->set('orderby','meta_value_num');
	    }
	}

	// Makes the custom columns for page views with ACF accessable for the quick edit and bulk edit screen 
	// ==================================

	add_action( 'bulk_edit_custom_box', 'add_to_bulk_quick_edit_custom_box', 10, 2 );
	
	add_action( 'quick_edit_custom_box', 'add_to_bulk_quick_edit_custom_box', 10, 2 );
	function add_to_bulk_quick_edit_custom_box( $column_name, $post_type ) {
	   switch ( $post_type ) {
	      case 'page':

	         switch( $column_name ) {
	            case 'page_views':
	               ?><fieldset class="inline-edit-col-right">
	                  <div class="inline-edit-group">
	                     <label>
	                        <span class="title">Page Views</span>
	                        <input type="text" name="page_views" value="" />
	                     </label>
	                  </div>
	               </fieldset><?php
	               break;
	         }
	         break;

	   }
	}

	// Includes the scripts needed to adjust and save the data on the edit screen
	// ==================================

	add_action( 'admin_print_scripts-edit.php', 'custom_enqueue_edit_scripts' );
	
	function custom_enqueue_edit_scripts() {
	   wp_enqueue_script( 'custom-admin-edit', get_bloginfo( 'stylesheet_directory' ) . '/js/lib/quick-edit.js', array( 'jquery', 'inline-edit-post' ), '', true );
	}

	// Saves the custom columns data for page views with ACF via the quick edits screen
	// ==================================

	add_action( 'save_post','custom_save_post', 10, 2 );
	
	function custom_save_post( $post_id, $post ) {

	   // don't save for autosave
	   if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
	      return $post_id;

	   // dont save for revisions
	   if ( isset( $post->post_type ) && $post->post_type == 'revision' )
	      return $post_id;

	   switch( $post->post_type ) {

	      case 'page':

	         // release date
		 // Because this action is run in several places, checking for the array key keeps WordPress from editing
	         // data that wasn't in the form, i.e. if you had this post meta on your "Quick Edit" but didn't have it
	         // on the "Edit Post" screen.
		 if ( array_key_exists( 'page_views', $_POST ) )
		    update_post_meta( $post_id, 'page_views', $_POST[ 'page_views' ] );

		 break;

	   }

	}

	// Saves the custom columns data for page views with ACF via the bulk edits screen
	// ==================================

	add_action( 'wp_ajax_manage_wp_posts_using_bulk_quick_save_bulk_edit', 'manage_wp_posts_using_bulk_quick_save_bulk_edit' );
	function manage_wp_posts_using_bulk_quick_save_bulk_edit() {
		// we need the post IDs
		$post_ids = ( isset( $_POST[ 'post_ids' ] ) && !empty( $_POST[ 'post_ids' ] ) ) ? $_POST[ 'post_ids' ] : NULL;
			
		// if we have post IDs
		if ( ! empty( $post_ids ) && is_array( $post_ids ) ) {

			// get the custom fields
			$custom_fields = array( 'page_views');
			
			foreach( $custom_fields as $field ) {
				
				// if it has a value, doesn't update if empty on bulk
				if ( isset( $_POST[ $field ] ) && !empty( $_POST[ $field ] ) ) {
				
					// update for each post ID
					foreach( $post_ids as $post_id ) {
						update_post_meta( $post_id, $field, $_POST[ $field ] );
					}
					
				}
				
			}
			
		}

	}

	// Creates custom options in the tinyMCE editor (uncomment the couple lines 
	// below is the custom admin plugin is not activated)
	// ==================================

	// // Callback function to insert 'styleselect' into the $buttons array
	// function my_mce_buttons_2( $buttons ) {
	// 	array_unshift( $buttons, 'styleselect' );
	// 	return $buttons;
	// }
	// // Register our callback to the appropriate filter
	// add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

	/*
	* Callback function to filter the MCE settings
	*/

	// Enable font size & font family selects in the editor
	// if ( ! function_exists( 'wpex_mce_buttons' ) ) {
	// 	function wpex_mce_buttons( $buttons ) {
	// 		array_unshift( $buttons, 'fontselect' ); // Add Font Select
	// 		array_unshift( $buttons, 'fontsizeselect' ); // Add Font Size Select
	// 		return $buttons;
	// 	}
	// }
	// add_filter( 'mce_buttons_2', 'wpex_mce_buttons' );

	// // Add custom Fonts to the Fonts list
	// if ( ! function_exists( 'wpex_mce_google_fonts_array' ) ) {
	// 	function wpex_mce_google_fonts_array( $initArray ) {
	// 	    $initArray['font_formats'] = 'Lato=Lato;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats';
	//             return $initArray;
	// 	}
	// }

	// add_filter( 'tiny_mce_before_init', 'wpex_mce_google_fonts_array' );

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
				'title' => 'Headers',
		    	'items' => array(
				    array(  
						'title' => 'Extra Large',  
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
				'title' => 'Blockquote',  
				'block' => 'blockquote',  
				'classes' => 'blockquote',
				'wrapper' => true,
				// 'styles' => array(
				// 	'font-style' => 'italic',
				//         	)
			),
			array(  
				'title' => 'Label',  
				'block' => 'span',  
				'classes' => 'button button-label inactive-button',
				'wrapper' => false,
				// 'styles' => array(
				//             	'color'         => '#ffffff', // or hex value #ff0000
				//             	'fontWeight'    => 'bold',
				//             	'backgroundColor' => '#161616',
				//             	'font-family' => 'sans-serif',
				//             	'padding' => '5px 15px',
				//         	)
			),
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
            	)
			),
		);  

		// $init_array['style_formats_merge'] = true;

		// Insert the array, JSON ENCODED, into 'style_formats'
		$init_array['style_formats'] = json_encode( $style_formats );  

		// $init_array['preview_styles'] .= ' font-weight font-style padding font-family background-color color';

		//unset($init_array['preview_styles']);


		
		return $init_array;  
	  
	} 
	// Attach callback to 'tiny_mce_before_init' 
	add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

}

?>