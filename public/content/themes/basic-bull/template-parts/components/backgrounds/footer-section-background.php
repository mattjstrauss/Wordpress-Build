<?php
	
	// Empty variables set with criteria below
	$backgroundContent = "";
	$backgroundModifier = "";
	$dataUrl = "";
	$dataId = "";
	$dataImage = "";
	$dataColor = "";
	$dataOverlay = "";
	$dataBackgroundColor = "";
	$dataFile = "";
	$dataPoster = "";
	$dataThumbnail = "";
	$dataPosition = "";
	$dataEmbed = "";
	$globalOption = "";

	// Disabled until criteria is met in checks below
	$backgroundContent = false;

	 if ( !get_field('footer_override') ) {
    	
    	$globalOption = 'options';
    }

	// Background fields
	$backgroundType = get_field('footer_background_type', $globalOption);
	$backgroundVideoSource = get_field('footer_background_video_source', $globalOption);
	$backgroundVideoEmbed = get_field('footer_background_video_embed', $globalOption);
	$backgroundVideoFile = get_field('footer_background_video_file', $globalOption);
	$backgroundImage = get_field('footer_background_image', $globalOption);
	$backgroundColor = get_field('footer_background_color', $globalOption);
	$backgroundOverlay = get_field('footer_background_overlay', $globalOption);
	$backgroundPositionVertical = get_field('footer_background_position_vertical', $globalOption);
	$backgroundPositionHorizontal = get_field('footer_background_position_horizontal', $globalOption);

	// Background videos
	if ( $backgroundType == 'video-background' ) {
	
		// YouTube or Vimeo
		if ( !empty($backgroundVideoEmbed) && $backgroundVideoSource !== 'upload') {	

			$backgroundContent = true;

			$backgroundModifier = " embed-background";
			
			preg_match('/src="(.+?)"/', $backgroundVideoEmbed, $match );
            
            $url = $match[1];

            $backgroundVideoEmbedUrl = $url;

            if ( preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $url, $match)) {
	
				if ( $match !== "" ) {

					$mediaId = $match[1];

					$mediaThumbnail = "http://i3.ytimg.com/vi/$mediaId/mqdefault.jpg";

					$maxQuality = "http://i3.ytimg.com/vi/$mediaId/maxresdefault.jpg";
					$highQuality = "http://i3.ytimg.com/vi/$mediaId/hqdefault.jpg";
					$mediumQuality = "http://i3.ytimg.com/vi/$mediaId/mqdefault.jpg";
					
					// Check if any return 404 and move to the next lower quality
					if (@getimagesize($maxQuality)) {

						$dataPoster = $maxQuality;

						$dataImage = 'style="background-image: url('.$maxQuality.');"';

					} elseif (@getimagesize($highQuality)) {
						
						$dataPoster = $highQuality;

						$dataImage = 'style="background-image: url('.$highQuality.');"';

					} elseif (@getimagesize($mediumQuality)) {

						$dataPoster = $mediumQuality;

						$dataImage = 'style="background-image: url('.$mediumQuality.');"';

					} else {

						$dataPoster = "";

					}

				}

				$dataEmbed = '<div class="embed-background-video"><iframe src="'.$backgroundVideoEmbedUrl.'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist='.$mediaId.'&widgetid=1&enablejsapi=1" frameborder="0" allowfullscreen></iframe></div>';

				$backgroundModifier .= " youtube";

			} elseif ( preg_match('/vimeo\.com/i', $backgroundVideoEmbedUrl) ) {

				// Check vimeo urls for particular pattern based on url
				if (strpos($backgroundVideoEmbedUrl, 'player.vimeo.com') !== FALSE) {
                    // works on:
                    // http://player.vimeo.com/video/37985580?title=0&amp;byline=0&amp;portrait=0
                    $pattern = '/player.vimeo.com\/video\/([0-9]+)\??/i';
                } else {
                    // works on:
                    // http://vimeo.com/37985580
                    $pattern = '/vimeo.com\/([0-9]+)\??/i';
                }

                // Get the id from matching the partern to the url
                if (preg_match($pattern, $backgroundVideoEmbedUrl, $results)) {

                	$mediaId = $results[1];

                }

                if ($match !== "") {

					$data = unserialize(file_get_contents("http://vimeo.com/api/v2/video/$mediaId.php"));
					
					$dataThumbnail =$data[0]['thumbnail_medium']; 

					$dataPoster = (explode("_640",$data[0]['thumbnail_large'])); //remove size restriction

					$dataPoster = $dataPoster[0];

					$dataImage = 'style="background-image: url('.$dataPoster.');"';

				}

				$dataEmbed = '<div class="embed-background-video"><iframe src="https://player.vimeo.com/video/'.$mediaId.'?autoplay=1&loop=1&title=0&byline=0&portrait=0&background=1&muted=1" frameborder="0" muted webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
				$backgroundModifier .= " vimeo";

			}

			// Video URL and ID
			$dataUrl = 'data-url="'.$backgroundVideoEmbedUrl.'"';
			$dataId = 'data-id="'.$id.'"';

			if ( $backgroundOverlay && $backgroundColor ) {

				$dataOverlay = '<div class="background-overlay" style="background-color: '.$backgroundColor.'"></div>';
			
			} elseif ( $backgroundColor ) {

				$dataBackgroundColor = '<div class="background-color" style="background-color: '.$backgroundColor.'"></div>';

			}
			
		// Video file
		} else {

			if ( $backgroundVideoFile ) {

				$backgroundContent = true;

				if ( $backgroundImage ) {
					
					$dataPoster = 'poster="'.$backgroundImage['sizes']['large'].'"';

				}

				$dataFile = '<video class="video video-js" muted loop autoplay playsinline preload="auto" '.$dataPoster.'><source src="'.$backgroundVideoFile.'" type="video/mp4"></video>';

			}

			if ( $backgroundOverlay && $backgroundColor ) {

				$dataOverlay = '<div class="background-overlay" style="background-color: '.$backgroundColor.'"></div>';
			
			} elseif ( $backgroundColor ) {

				$dataBackgroundColor = '<div class="background-color" style="background-color: '.$backgroundColor.'"></div>';

			}

		}

	// Background image
	} elseif ( $backgroundType == 'image-background' ) {

		if ( $backgroundImage ) {

			$backgroundContent = true;

			if ( $backgroundPositionVertical && $backgroundPositionHorizontal !== "center" ) {

				$dataPosition = " ".$backgroundPositionVertical."-".$backgroundPositionHorizontal;

			}
				
			$dataImage = 'style="background-image: url('.$backgroundImage['sizes'][ 'large' ].');"';

			if ( $backgroundOverlay && $backgroundColor ) {

				$dataOverlay = '<div class="background-overlay" style="background-color: '.$backgroundColor.'"></div>';
			
			} elseif ( $backgroundColor ) {

				$dataBackgroundColor = '<div class="background-color" style="background-color: '.$backgroundColor.'"></div>';

			}

		}

	// Background color
	} elseif ( $backgroundType == 'color-background' ) {

		if ( $backgroundColor ) {

			$backgroundContent = true;
				
			$dataColor = 'style="background-color: '.$backgroundColor.'"';

		}

	} 

?>

<?php if ( $backgroundType !== "none" && $backgroundContent == true ): ?>
	
	<div class="component background-component<?php echo $backgroundModifier; ?>">
		
		<div class="<?php echo $backgroundType; ?><?php echo $dataPosition; ?>" <?php echo $dataUrl; ?> <?php echo $dataId; ?> <?php echo $dataImage; ?> <?php echo $dataColor; ?>><?php echo $dataFile; ?><?php echo $dataEmbed; ?></div>

		<?php echo $dataOverlay; ?>

		<?php echo $dataBackgroundColor; ?>

	</div>

<?php endif; ?>
