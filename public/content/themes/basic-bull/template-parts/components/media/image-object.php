<?php

	// Image object
	$imageObject = get_sub_field('image');
	$alt = "";
	$title = "";

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

		if ( !empty($alt) ) {
			$title = 'title="'.$title.'"';
		}

?>

	<figure>

		<div class="media-container">

			<img src="<?php echo $url; ?>" <?php echo $alt; ?> <?php echo $title; ?>/>

		</div>

		<?php if( $imageCaption || $mediaCaption ): ?>
	
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

	</figure>

<?php endif; ?>