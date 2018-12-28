<?php

	// Temporary variables
	$alt = "";
	$title = "";
	$src = "";
	$poster = "";
	$dataPoster = "";
	$class = "";
	$fieldUrl = "";
	$closeButton = "";
	$caption = "";
	$mediaType = "";
	$mediaSource = "";
	$mediaUrl = "";
	$mediaId = "";
	$mediaPoster = "";
	$mediaIcon = "";
	$mediaFile = "";
	$imageObject = "";

	// media fields
	$mediaSource = get_sub_field('media_source');
	$mediaEmbed = get_sub_field('media_embed');
	$mediaFile = get_sub_field('media_file');

	// Image object
	$imageObject = get_sub_field('media_image');


	// Media description
	$mediaDescription = get_sub_field('media_description');

	$mediaContent = false;

	if ( !empty( $mediaEmbed || $mediaFile || $mediaDescription ) ):

		$mediaObject = true;

		if( !empty($imageObject) ) {

			// Image object values
			$imageUrl = $imageObject['url'];
			$title = $imageObject['title'];
			$alt = $imageObject['alt'];
			$imageCaption = $imageObject['caption'];
			$imageLink = get_field('source', $imageObject['ID']); 

			// thumbnail
			// $size = '';
			// $full = $imageObject['sizes'][ $size ];

			if ( !empty($alt) ) {
				$alt = 'alt="'.$alt.'"';
			}

			if ( !empty($title) ) {
				$title = 'title="'.$title.'"';
			}

		}

		if ( !empty($mediaEmbed) && $mediaSource !== 'upload') {

			preg_match('/src="(.+?)"/', $mediaEmbed, $match );
            
            $url = $match[1];

            $mediaUrl = $url;

            if ( preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $url, $match)) {
	
				if ( $match !== "" ) {

					$mediaId = $match[1];

					$mediaThumbnail = "http://i3.ytimg.com/vi/$mediaId/mqdefault.jpg";

					$maxQuality = "http://i3.ytimg.com/vi/$mediaId/maxresdefault.jpg";
					$highQuality = "http://i3.ytimg.com/vi/$mediaId/hqdefault.jpg";
					$mediumQuality = "http://i3.ytimg.com/vi/$mediaId/mqdefault.jpg";
					
					// Check if any return 404 and move to the next lower quality
					if (@getimagesize($maxQuality)) {
						
						$mediaPoster = $maxQuality;

					} elseif (@getimagesize($highQuality)) {
						
						$mediaPoster = $highQuality;

					} elseif (@getimagesize($mediumQuality)) {

						$mediaPoster = $mediumQuality;

					} else {

						$mediaPoster = "";

					}

				}

				$mediaSource = "youtube";

			} elseif ( preg_match('/vimeo\.com/i', $url) ) {

				// Check vimeo urls for particular pattern based on url
				if (strpos($url, 'player.vimeo.com') !== FALSE) {
                    // works on:
                    // http://player.vimeo.com/media/37985580?title=0&amp;byline=0&amp;portrait=0
                    $pattern = '/player.vimeo.com\/media\/([0-9]+)\??/i';
                } else {
                    // works on:
                    // http://vimeo.com/37985580
                    $pattern = '/vimeo.com\/([0-9]+)\??/i';
                }

                // Get the id from matching the partern to the url
                if (preg_match($pattern, $url, $results)) {

                	$mediaId = $results[1];

                }
                
				if ($match !== "") {

					$data = unserialize(file_get_contents("http://vimeo.com/api/v2/media/$mediaId.php"));
					
					$mediaThumbnail =$data[0]['thumbnail_medium']; 

					$poster = (explode("_640",$data[0]['thumbnail_large'])); //remove size restriction

					$mediaPoster = $poster[0];

				}

				$mediaSource = "vimeo";

			}

		} else {

			$mediaUrl = $mediaFile;
		}

		if ( !empty($mediaPoster) ) {
							
			$mediaPoster = $mediaPoster;
			$dataPoster = ' data-poster="'.$mediaPoster.'"';

		} elseif( !empty($imageObject) ) {

			$mediaPoster = $imageUrl;
			$dataPoster = ' data-poster="'.$imageUrl.'"';

		}

?>

	<?php get_template_part( 'template-parts/components/backgrounds/component', 'background' ); ?>

	<div class="component media-component featured-video-component">

		<div class="container">

			<div class="row">

				<div class="col-sm-12">

					<?php 

						if ( !empty($mediaDescription) ) : 

						$contentPosition = get_sub_field('description_positioning');

					?>



						<div class="component-content">

							<div class="featured-video-details <?php echo $contentPosition; ?>">
							
								<span class="media-label">Video</span>

								<?php echo $mediaDescription; ?>

								<?php 

									if ( !empty( $mediaEmbed || $mediaFile ) ) :
									
										$mediaFile = ' data-media-file="'.$mediaUrl.'"';
										$mediaId = ' data-id="'.$mediaId.'"';	
										$mediaIcon = 'icon-ui-media-play';
										$mediaSource = ' data-source="'.$mediaSource.'"';

									
								?>

								<div class="modal-trigger video-link"<?php echo $mediaSource; ?><?php echo $mediaId; ?><?php echo $mediaFile; ?><?php echo $dataPoster; ?>>

									<a href="<?php echo $mediaUrl; ?>" class="no-js">
									
										<i class="icon">
											
											<svg>
												
												<use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#<?php echo $mediaIcon; ?>"></use>
												
											</svg>

										</i>

									</a>

								</div>

								<?php endif; ?>

							</div>

						</div>

					<?php endif; ?>

					<?php if ( $mediaObject == true ) : ?>

						<div class="media-modal">
									
							<div class="modal-container">

								<div class="modal-content">

								</div>
								
								<a href="#" class="close-button modal-close">
									
									<i class="icon icon-plus-minus"></i>

								</a>
								
							</div>

							<div class="modal-overlay"></div>

						</div>

					<?php endif; ?>

				</div>

			</div>

		</div>

	</div>

<?php endif; ?>
