<?php // if( get_sub_field('panel_label') && get_sub_field('panel_content') ):?>

    <div class="accordion-panel">

        <?php get_template_part( 'template-parts/accordions/panel', 'label' ); ?>

        <?php get_template_part( 'template-parts/accordions/panel', 'content' ); ?>

    </div>

<?php // endif; ?>
