<?php 

/*--------------------------------------------------------------
Custom post types
--------------------------------------------------------------*/

	class Custom_Post_Type {

	    public $post_type_name;
	    public $post_type_options;
	    public $post_type_labels;

		
		// Remove underscore or dash and add space
		public static function beautify( $string ) {

	    	return ucwords( str_replace( ['-', '_'], ' ', $string ) );

		}

	 	// Remove space and add underscore
		public static function uglify( $string ) {

	    	return strtolower( str_replace( ' ', '_', $string ) );

		}

		// Pluralize
		public static function pluralize( $string ) {
	    
	    	$last = $string[strlen( $string ) - 1];
	     
		    if( $last == 'y' ) {
			        $cut = substr( $string, 0, -1 );
			        //convert y to ies
			        $plural = $cut . 'ies';

		    } else {

		        // just attach an s
		        $plural = $string . 's';

		    }
		     
		    return ucwords( str_replace( ['-', '_'], ' ', $plural ) );
		}
	     
	    // Class constructor w/ options and labels that can be passed need be
	    public function __construct( $name, $options = [], $labels = [] ) {
	    	
	    	// Default options
	    	$default_post_options = [
				'public' => true,
				'supports' => ['title', 'editor', 'thumbnail', 'revisions']
			];

			// Required labels
			$required_post_labels = [
				'singular_name' => self::beautify( $name ),
				'plural_name' => self::pluralize( $name )
			];

			// Sets post type name
	    	$this->post_type_name = strtolower( str_replace( ' ', '_', $name ) );

			// Adds defaults options to any addiontional arguments passed
			$this->post_type_options = $options + $default_post_options;

			// Adds required labels to any addiitional labels passed
			$this->post_type_labels = $labels + $required_post_labels;

			// Sets the lables array and adds all of the labels on the arguments array
			$this->post_type_options['labels'] = $this->post_type_labels + $this->default_post_labels();
			
		    // Add action to register the post type, if the post type does not already exist
		    if( ! post_type_exists( $this->post_type_name ) ) {
		        add_action( 'init', array( $this, 'register_post_type' ) );
		    }
	     
	    }

	    // Sets default post type labels
	    public function default_post_labels() {
			
			return [
				'name' => $this->post_type_labels['plural_name'],
				'singular_name' => $this->post_type_labels['singular_name'],
				'add_new' => 'Add New ' . $this->post_type_labels['singular_name'],
				'add_new_item' => 'Add New ' . $this->post_type_labels['singular_name'],
				'edit_item' => 'Edit ' . $this->post_type_labels['singular_name'],
				'new_item' => 'New ' . $this->post_type_labels['singular_name'],
				'view' => 'View ' . $this->post_type_labels['singular_name'] . ' Page',
				'view_item' => 'View ' . $this->post_type_labels['singular_name'],
				'all_items' => 'All ' . $this->post_type_labels['plural_name'],
				'search_items' => 'Search ' . $this->post_type_labels['plural_name'],
				'not_found' => 'No matching ' . strtolower($this->post_type_labels['plural_name']) . ' found',
				'not_found_in_trash' => 'No ' . strtolower($this->post_type_labels['plural_name']) . ' found in Trash',
				'parent_item_colon' => 'Parent ' . $this->post_type_labels['singular_name']
			];
		}
	     
	   	// Registers the post type
		public function register_post_type() {
		     
		    register_post_type( $this->post_type_name, $this->post_type_options );

		}

	}

	$sample = new Custom_Post_Type( 'custom_post' , [], []);

?>