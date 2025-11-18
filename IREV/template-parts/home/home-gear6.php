<?php
/**
 * Template Part: Home Gear6
 */
?>
<?php
$gear_6 = get_field('gear_6');
$gear_6_is_shown = $gear_6 ? $gear_6['is_shown'] : false;
?>
<?php if ($gear_6_is_shown) : ?>
<section class="home_gear6">
    <header class="home_gear_header">
        <span><?php echo esc_html($gear_6['title']); ?></span>
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear6.svg')); ?>" />
    </header>
    <div class="home_gear6_container">
        <h2><?php echo esc_html($gear_6['heading']); ?></h2>
        
        <?php if (!empty($gear_6['button']['heading']) && !empty($gear_6['button']['url'])) : ?>
            <a href="<?php echo esc_url($gear_6['button']['url']); ?>">
                <button class="open_modal"><?php echo esc_html($gear_6['button']['heading']); ?></button>
            </a>
        <?php endif; ?>

        <div class="lottie_container">
            <lottie-player
                src="<?php echo esc_url(get_theme_file_uri('src/animations/pixelcar.json')); ?>"
                speed="1"
                style="width: 100%; background: transparent"
                loop
                autoplay>
            </lottie-player>
        </div>
    </div>
</section>
<?php endif; ?>