<?php 
	
	$carouselType = "";
	$carouselContainer = "";
	$slidesContainer = "";
	$slideContainer = "";
	$slideContent = "";

	if ( get_sub_field('carousel_type') && ( get_sub_field('copy_slides') || get_sub_field('image_slides') ) ) :
		
		$carouselType = get_sub_field('carousel_type');
		$slidesContainer = "carousel-slides";
		$slideContainer = "slide";
		$slideContent = "slide-content";

?>

	<div class="component carousel-component <?php echo $carouselType; ?>">

		<div class="component-container">

			<?php if ( $carouselType == 'copy-carousel' && have_rows('copy_slides') ): ?>

				<div class="container">
		
					<div class="row">

						<div class="col-sm-12 col-lg-10 col-lg-offset-1">

							<div class="component-content">

								<a href="#" class="previous-button">
										
									<svg>
										<use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-ui-arrow-left"></use>
									</svg>

								</a>

								<div class="<?php echo $slidesContainer; ?>">

									<?php  while ( have_rows('copy_slides') ) : the_row(); ?>

										<div class="<?php echo $slideContainer; ?> copy-slide">

											<div class="<?php echo $slideContent; ?> copy-<?php echo $slideContent; ?>">

												<?php if ( get_sub_field('slide_content') ): ?>

													<?php the_sub_field('slide_content'); ?>

												<?php endif; ?>

											</div>

										</div>

									<?php endwhile; ?>

								</div>

								<a href="#" class="next-button">
										
									<svg>
										<use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-ui-arrow-right"></use>
									</svg>
										
								</a>

							</div>

						</div>

					</div>

				</div>

			<?php elseif( $carouselType == 'image-carousel' && get_sub_field('image_slides') ): ?>

				<div class="component-content">

					<a href="#" class="previous-button">
							
						<svg>
							<use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-ui-arrow-left"></use>
						</svg>

					</a>
	
					<div class="<?php echo $slidesContainer; ?>">

						<?php $slideImages = get_sub_field('image_slides'); ?>

						<?php foreach( $slideImages as $slideImage ): ?>

							<div class="<?php echo $slideContainer; ?> image-slide">

								<div class="<?php echo $slideContent; ?> image-<?php echo $slideContent; ?>">

									<figure>
										
										<div class="slide-background-image" style="background-image: url('<?php echo $slideImage['sizes']['large']; ?>');"></div>
										<img src="<?php echo $slideImage['sizes']['thumbnail']; ?>" alt="<?php echo $slideImage['alt']; ?>" class="srt-only"/>

										<?php if ( !empty($slideImage['caption'] ) || get_field('source', $slideImage['ID']) ): ?>

											<figcaption>

												<p>
													
													<?php 

														if ( !empty($slideImage['caption'] ) ) {
														
															echo $slideImage['caption'];

														} 

													?>

												</p>

												<?php 

													$imageLink = get_field('source', $slideImage['ID']);  

													if( $imageLink ): 

												?>

													<a href="<?php echo $imageLink['url']; ?>" target="<?php echo $imageLink['target']; ?>" class="media-source"><?php echo $imageLink['title']; ?></a>

												<?php endif; ?>

											</figcaption>

										<?php endif; ?>

									</figure>

								</div>

							</div>

						<?php endforeach; ?>

					</div>

					<a href="#" class="next-button">
											
						<svg>
							<use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-ui-arrow-right"></use>
						</svg>
						
					</a>

				</div>

			<?php endif; ?>
					
		</div>

	</div>

<?php endif; ?>