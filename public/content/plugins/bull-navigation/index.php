<?php

/**
	* Plugin Name:       Custom Navigation by Bull Interactive
	* Description:       A plugin that offers various UX methods for navigating a website.
	* Version:           1.0.0
	* Author:            By Bull Interactive 
	* License:           GPL-2.0+
	* Text Domain:       bull-navigation

	* The public-facing functionality of the plugin.
	*
	* Defines the plugin name, version, and two examples hooks for how to
	* enqueue the public-facing stylesheet and JavaScript.
	*
	* @package    Bull_Navigation
	* @subpackage Bull_Navigation/src
	* @author     SK8Tech <support@sk8.tech>
	*/

class Bull_Navigation {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */

	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */

	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function enqueue_styles() {

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/style.css', array(), $this->version, 'all');
		
		// wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/wp-rest-filter-public.js', array('jquery'), $this->version, false);

	}

}