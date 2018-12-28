<?php

	if ( is_archive() ) {
		
		$archiveTerm = get_queried_object();

		$imageObject = get_field('featured_image', $archiveTerm);
	
	} elseif ( get_field('featured_image') ) {
		
		$imageObject = get_field('featured_image');

	} else { 

		$currentPostType = get_post_type();
		$currentTerm = get_field('category');

		if ( is_404() || is_search() ) {

			$currentPostType = "page";

		}

		if ( have_rows( 'default_images', 'options' ) ) {

			while ( have_rows( 'default_images', 'options' ) ) : the_row();

				$postTypeOption = get_sub_field('post_and_page_types', 'options' );
				$pageTemplateOption = get_sub_field('pages', 'options' );
				$postCategoryOption = get_sub_field('post_category', 'options' );
				$eventCategoryOption = get_sub_field('event_category', 'options' );

				
				if ( $postTypeOption ) {

					if ( in_array($currentPostType, $postTypeOption ) && $currentPostType == 'post' && !empty($postCategoryOption) ) {

						if ( $currentTerm && ( in_array($currentTerm->term_id, $postCategoryOption ) ) ) {

							$imageObject = get_sub_field('featured_image', 'options');

							break;

						}

					} elseif ( in_array($currentPostType, $postTypeOption ) && $currentPostType == 'event' && !empty($eventCategoryOption) ) {

						if ( $currentTerm && ( in_array($currentTerm->term_id, $eventCategoryOption ) ) ) {

							$imageObject = get_sub_field('featured_image', 'options');

							break;

						}

					} elseif ( in_array($currentPostType, $postTypeOption ) && $currentPostType == 'page' && !empty($pageTemplateOption) ) {

						if ( is_404() && in_array('not-found', $pageTemplateOption ) ) {

							$imageObject = get_sub_field('featured_image', 'options');

							break;

						} elseif ( is_search() && in_array('search-results', $pageTemplateOption ) ) {

							$imageObject = get_sub_field('featured_image', 'options');

							break;

						}

					} elseif ( in_array($currentPostType, $postTypeOption ) ) {

						$imageObject = get_sub_field('featured_image', 'options');

						break;

					}

				}

			endwhile;

		}

	}
	
	$alt = "";
	$title = "";
	$featuredBackground = "";
	$imageVisibility = "";

	if( !empty($imageObject) ): 

		// vars
		$url = $imageObject['url'];
		$title = $imageObject['title'];
		$alt = $imageObject['alt'];
		$imageCaption = $imageObject['caption'];
		$imageLink = get_field('source', $imageObject['ID']); 

		// Media caption (override)
		$mediaCaption = get_sub_field('media_caption');

		// thumbnail
		// $size = '';
		// $full = $imageObject['sizes'][ $size ];

		if ( !empty($alt) ) {
			$alt = 'alt="'.$alt.'"';
		}

		if ( !empty($title) ) {
			$title = 'title="'.$title.'"';
		}

		
		$featuredBackground = ' style="background-image: url('.$url.')";';
		$imageVisibility = 'class='.'"'.'srt-only'.'"';

?>

	<figure>

		<div class="media-container"<?php echo $featuredBackground; ?>>

			<img src="<?php echo $url; ?>" <?php echo $alt; ?> <?php echo $title; ?><?php echo $imageVisibility; ?>/>

		</div>

		<?php if( $imageCaption || $mediaCaption ): ?>

			<?php if ( !(in_category('settlement-stories') || in_category('alumni')) ) : ?>
	
				<figcaption>

					<?php if ( $mediaCaption ) {

						get_template_part( 'template-parts/components/media/media', 'caption' );

					} else {

						echo '<p>'.$imageCaption.'</p>';

					} ?>

					<?php if( $imageLink ): ?>

						<a href="<?php echo $imageLink['url']; ?>" target="<?php echo $imageLink['target']; ?>" class="media-source"><?php echo $imageLink['title']; ?></a>

					<?php endif; ?>

				</figcaption>		

			<?php endif; ?>
							
		<?php endif; ?>

	</figure>

<?php endif; ?>