<?php
/**
 * Template part for displaying components
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package settlementmusic
 */

?>

<?php if( have_rows('components') ): ?>

    <?php while ( have_rows('components') ) : the_row(); ?>

        <?php get_template_part( 'template-parts/components/general/component', 'label' ); ?>

        <?php 

            $sectionClass = "";
            $colorScheme = "";
            $spacingTop = "";
            $spacingBottom = "";

            $component = get_row_layout();
            $componentName = str_replace('_', '-', $component);
            $sectionClass = str_replace('-component', '', $componentName);

            if ( get_sub_field('color_scheme') ) {

                if ( get_sub_field( 'color_scheme' ) !== 'none') {
                    
                    $colorScheme = " ".get_sub_field( 'color_scheme' )."-scheme";

                }

            }

            if ( get_sub_field('spacing_top') ) {

                if ( get_sub_field( 'spacing_top' ) !== 'default-spacing') {
                    
                    $spacingTop = " ".get_sub_field( 'spacing_top' ).'-top';

                }

            }

            if ( get_sub_field('spacing_bottom') ) {

                if ( get_sub_field( 'spacing_bottom' ) !== 'default-spacing') {
                    
                    $spacingBottom = " ".get_sub_field( 'spacing_bottom' ).'-bottom';

                }

            }
            
        ?>

        <div class="section section-<?php echo $sectionClass; ?><?php echo $colorScheme; ?><?php echo $spacingTop; ?><?php echo $spacingBottom; ?>">

            <?php if( get_row_layout() == 'general_component' ): ?>

                <?php get_template_part( 'template-parts/content/general', 'container' ); ?>

            <?php elseif( get_row_layout() == 'media_component' ):  ?>

                <?php get_template_part( 'template-parts/components/media/media', 'container' );  ?>

            <?php elseif( get_row_layout() == 'accordion_component' ):  ?>

                <?php get_template_part( 'template-parts/components/accordions/accordion', 'container' );  ?>

            <?php elseif( get_row_layout() == 'carousel_component' ):  ?>

                <?php get_template_part( 'template-parts/components/carousels/general-carousel', 'container' );  ?>

            <?php elseif( get_row_layout() == 'tabs_component' ):  ?>

                <?php get_template_part( 'template-parts/components/tabs/tabs', 'container' );  ?>

            <?php elseif( get_row_layout() == 'card_group_component' ):  ?>

                <?php get_template_part( 'template-parts/components/cards/card-group', 'container' );  ?>

            <?php elseif( get_row_layout() == 'featured_card_component' ):  ?>

                <?php get_template_part( 'template-parts/components/cards/featured-card', 'container' );  ?>

            <?php elseif( get_row_layout() == 'featured_post_component' ):  ?>

                <?php get_template_part( 'template-parts/components/cards/featured-post', 'container' );  ?>

            <?php elseif( get_row_layout() == 'featured_video_component' ):  ?>

                <?php get_template_part( 'template-parts/components/media/featured-video', 'container' );  ?>

            <?php elseif( get_row_layout() == 'events_component' ):  ?>

                <?php get_template_part( 'template-parts/components/cards/events', 'container' );  ?>

            <?php elseif( get_row_layout() == 'profiles_component' ):  ?>

                <?php get_template_part( 'template-parts/components/cards/profiles', 'container' );  ?>

            <?php elseif( get_row_layout() == 'news_component' ):  ?>

                <?php get_template_part( 'template-parts/components/cards/news', 'container' );  ?>

             <?php elseif( get_row_layout() == 'timeline_component' ):  ?>

                <?php get_template_part( 'template-parts/components/timeline/timeline', 'container' ); ?>

            <?php endif; ?>

        </div>

   <?php  endwhile; ?>

<?php endif; ?>
