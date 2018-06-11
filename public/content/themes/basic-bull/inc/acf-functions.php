<?php 

// =============================================================================
// ACF functionality enhancements
// =============================================================================

if ( ! function_exists( 'basic_bull_acf_functions' ) ) {

	function basic_bull_acf_functions() {

		// ACF options page
		// ==================================

		if( function_exists('acf_add_options_page') ) {

			acf_add_options_page(array(
				'page_title' 	=> 'Theme General Settings',
				'menu_title'	=> 'Theme Settings',
				'menu_slug' 	=> 'theme-general-settings',
				'capability'	=> 'edit_posts',
				'redirect'		=> false
			));
			
			acf_add_options_sub_page(array(
				'page_title' 	=> 'Theme Header Settings',
				'menu_title'	=> 'Header',
				'parent_slug'	=> 'theme-general-settings',
			));
			
			acf_add_options_sub_page(array(
				'page_title' 	=> 'Theme Footer Settings',
				'menu_title'	=> 'Footer',
				'parent_slug'	=> 'theme-general-settings',
			));
			
		}

		// Replaces the field title and allows 
		// custom component label for backend readability
		// ==================================

		function acf_flexible_content_layout_label( $title, $field, $layout, $i ) {

			if( $componentLabel = get_sub_field('component_label') ) {	

				// remove layout title from text
				$title = '';

				$title .= $componentLabel;		
			}	
			
			return $title;

		}

		add_filter('acf/fields/flexible_content/layout_title/name=components', 'acf_flexible_content_layout_label', 10, 4);

		// Change "Add to gallery" button text with the gallery field within the Carousel Component
		// Remove the "No Image Selected" text
		// ==================================

		function my_acf_admin_footer() { ?>
			
			<script type="text/javascript">
				
				(function($) {
					
					// Changes "Add to Gallery" text for the gallery field
					$('.acf-field-5acb72ad5388b a.acf-gallery-add').text('Add Image(s)');

					// Changes "No image selected" text for the image field
					$(".acf-image-uploader .hide-if-value p").each(function(){
                		$(this).replaceWith($(this).html().replace("No image selected", ""));
            		});

            		// Changes "No file selected" text for the file field
					$(".acf-file-uploader .hide-if-value p").each(function(){
                		$(this).replaceWith($(this).html().replace("No file selected", ""));
            		});
				
				})(jQuery);	

			</script>
			
		<?php }

		add_action('acf/input/admin_footer', 'my_acf_admin_footer');

		// ACF set address to certain field(s)
		// ==================================

		add_action('acf/input/admin_footer', 'acf_get_address');

		function acf_get_address() { 
		    
		   	?><script type="text/javascript">
		    
		    	(function($) {
		        
		        // do this when the map is changed
		        acf.add_action('google_map_change', function( latlng, $map, $field ){

		            // get the address using the geocoder
		            acf.fields.google_map.geocoder.geocode({ 'latLng' : latlng }, function( results, status ){

		                // console.log(output)

		                var address_components = results[0].address_components;
						
						var componentsShortName={};

						var componentsLongName={};

						// console.log(address_components);
						
						$.each(address_components, function(k,v1) {
							$.each(v1.types, function(k2, v2){
								componentsShortName[v2]=v1.short_name;
							});
						});

						$.each(address_components, function(k,v1) {
							$.each(v1.types, function(k2, v2){
								componentsLongName[v2]=v1.long_name;
							});
						})

		                var locationNumber = componentsLongName.street_number;
		                var locationStreet = componentsShortName.route;
		                var locationAddress = locationNumber +' '+ locationStreet;
		                var locationCity = componentsLongName.locality;
		                var locationState = componentsShortName.administrative_area_level_1;
		                var locationZip = componentsLongName.postal_code;
		                
		                // set it to a text field(s)
		                // Street address
		                $field.next('.acf-field-group').find('.acf-field-5ad8eac208b97 input').val(locationAddress);
		                // City
		                $field.next('.acf-field-group').find('.acf-field-5ad8eacc08b98 input').val(locationCity);
		                // State
		                $field.next('.acf-field-group').find('.acf-field-5ad8eada08b99 input').val(locationState);
		                // Zip
	                	$field.next('.acf-field-group').find('.acf-field-5ad8eaee08b9a input').val(locationZip);
				    
					});
		                    
		        });
		        
		    	})(jQuery);    

		    </script><?php
		      
		}

		// ACF Google maps API
		// ==================================
		
		function my_acf_init() {
		
			acf_update_setting('google_api_key', 'AIzaSyC5GKwjbFzIKnBlp-tktYQnusP6At1jD5Q');
		}

		add_action('acf/init', 'my_acf_init');

		// Escape HTML in code_snippet ACF field.
		// ==================================
		
		function escapeHTML($arr) {
		    if (version_compare(PHP_VERSION, '5.2.3') >= 0) {
		        $output = htmlspecialchars($arr[2], ENT_NOQUOTES, get_bloginfo('charset'), false);
		    }
		    else {
		        $specialChars = array(
		            '&' => '&amp;',
		            '<' => '&lt;',
		            '>' => '&gt;'
		        );
		        // decode already converted data
		        $data = htmlspecialchars_decode($arr[2]);
		        // escapse all data inside <pre>
		        $output = strtr($data, $specialChars);
		    }
		    if (! empty($output)) {
		        return  $arr[1] . $output . $arr[3];
		    }   else    {
		        return  $arr[1] . $arr[2] . $arr[3];
		    }
		}

		function my_acf_update_value( $value, $post_id, $field  ) {
			
			if (!preg_match('(&amp;|&lt;|&gt;)', $value)) {
		    	
		    	$value = preg_replace_callback('@()(.*)()@isU', 'escapeHTML', $value);

		    }
			
			// return
		    return $value;
		    
		}

		// acf/update_value/name={$field_name} - filter for a specific field based on it's name
		add_filter('acf/update_value/name=code_snippet', 'my_acf_update_value', 10, 3);

	}

	add_action( 'after_setup_theme', 'basic_bull_acf_functions' );

}

?>