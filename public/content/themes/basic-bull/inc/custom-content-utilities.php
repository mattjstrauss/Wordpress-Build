<?php 

/*==============================================================
Custom content specific utilities
==============================================================*/

if ( ! function_exists( 'basic_bull_custom_content_utilities' ) ) {

    function basic_bull_custom_content_utilities() {

    	// Add wrapper div to embeds
        function responsive_embeds($html, $url, $attr) {

            // Check for different providers and add appropriate classes.

            // Add these classes to all embeds.
            $classes = array(
                'responsive-embed',
            );

            if ( false !== strpos( $url, 'vimeo.com' ) ) {
                $source[] = 'responsive-video vimeo';
            }

            if ( false !== strpos( $url, 'youtube.com' ) || false !== strpos( $url, 'youtu.be' ) ) {
                $source[] = 'responsive-video youtube';
            }

            if ( false !== strpos( $url, 'instagram.com' ) ) {
                $source[] = 'instagram';
            }

            if ( false !== strpos( $url, 'facebook.com' ) ) {
                $source[] = 'facebook';
            }

            if ( false !== strpos( $url, 'twitter.com' ) ) {
                $source[] = 'twitter';
            }

            $classes = array_merge( $classes, $source );

            return '<div class="media-container"><div class="' . esc_attr( implode( $classes, ' ' ) ) . '">' . $html . '</div></div>';

        }

        add_filter('embed_oembed_html', 'responsive_embeds', 10, 3);

        /**
        * Improves the WordPress caption shortcode with HTML5 figure & figcaption, microdata & wai-aria attributes
        *
        * Author: @joostkiens
        * Licensed under the MIT license
        * https://gist.github.com/JoostKiens/4477366
        *
        * @param  string $val     Empty
        * @param  array  $attr    Shortcode attributes
        * @param  string $content Shortcode content
        * @return string          Shortcode output
        */
        function my_img_caption_shortcode_filter( $val, $attr, $content = null ) {
        
        extract( shortcode_atts( array(
            'id'      => '',
            'align'   => 'aligncenter',
            'width'   => '',
            'caption' => ''
        ), $attr ) );

        // No caption, no dice...
        if ( 1 > (int) $width || empty( $caption ) )
        
        return $val;

        if ( $id )
            $id = esc_attr( $id );

            // Add itemprop="contentURL" to image - Ugly hack
            $content = str_replace('<img', '<img itemprop="contentURL"', $content);
        
            return '<figure id="' . $id . '" aria-describedby="figcaption_' . $id . '" class="wp-caption ' . esc_attr($align) . '" itemscope itemtype="http://schema.org/ImageObject" style="width: ' . (0 + (int) $width) . 'px">' . do_shortcode( $content ) . '<figcaption id="figcaption_'. $id . '" class="wp-caption-text" itemprop="description"><p>' . $caption . '</p></figcaption></figure>';
        }

        add_filter( 'img_caption_shortcode', 'my_img_caption_shortcode_filter', 10, 3 );


    }

        
    add_action( 'after_setup_theme', 'basic_bull_custom_content_utilities' );

}