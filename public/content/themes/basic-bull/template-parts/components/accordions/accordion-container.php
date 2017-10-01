<?php // if( have_rows('accordion_panel') ): ?>

    <div class="component accordion-component">

        <div class="component-content">

            <div class="container">

                <?php // while ( have_rows('accordion_panel') ) : the_row(); ?>

                    <?php get_template_part( 'template-parts/accordions/accordion', 'panel' ); ?>

                <?php // endwhile; ?>

            </div>

        </div>

    </div>

<?php // endif; ?>