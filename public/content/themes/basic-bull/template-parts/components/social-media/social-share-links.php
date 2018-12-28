<div class="module share-module">

	<div class="content-wrapper">

		<?php $emailExcerpt = ""; ?>

		<?php if(get_field('excerpt')): ?>
				
			<?php $emailExcerpt = '&amp;Body='.strip_tags(get_field('excerpt')).' '.get_the_permalink(); ?>

		<?php endif; ?>

		<a href="#" class="share-module-trigger">


			<i class="icon">

				<img src="<?php echo get_template_directory_uri(); ?>/img/ui/icon-ui-share-alt.svg" alt="" class="inline-svg">

			</i>

			<span class="srt-only">Share</span>
			
		</a>
	
		<div class="share-link-wrapper">

			<a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>" class="share-link share-facebook popout-window">
				<i class="icon"><svg><use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-social-facebook"></use><svg></i>
				<span class="srt-only">Share this show via Facebook</span>
			</a>

			<a href="https://twitter.com/share?url=<?php echo wp_get_shortlink(); ?>&amp;hashtags=<?php //the_field('tweet_hashtag'); ?>&text=<?php the_title(); ?>" class="share-link share-twitter popout-window">
				
				<i class="icon"><svg><use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-social-twitter"></use><svg></i>
				<span class="srt-only">Share this show on Twitter</span>

			</a>

			<a href="https://plus.google.com/share?url=<?php the_permalink(); ?>" class="share-link share-google popout-window">
				
				<i class="icon"><svg><use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-social-google-plus"></use><svg></i>
				<span class="srt-only">Share this show on Twitter</span>

			</a>

			<a href="https://www.linkedin.com/shareArticle?url=<?php the_permalink(); ?>&title=<?php the_title(); ?>&source=<?php echo get_bloginfo();?>&mini=true" class="share-link share-linkedin popout-window">
				
				<i class="icon"><svg><use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-social-linkedin"></use><svg></i>
				<span class="srt-only">Share this show on Twitter</span>

			</a>

			<a href="mailto:?Subject=<?php the_title(); ?><?php echo $emailExcerpt; ?>">
				
				<i class="icon"><svg><use xlink:href="<?php echo get_template_directory_uri(); ?>/img/spritemap.svg#icon-ui-email"></use><svg></i>
				<span class="srt-only">Share this show via Email</span>

			</a>

		</div>

	</div>

</div>