<?php

	// Media caption
	$mediaCaption = get_sub_field('media_caption');

?>

<?php if ( !empty( $mediaCaption ) ) : ?>

	<?php echo $mediaCaption; ?>

<?php endif; ?>