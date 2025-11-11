<?php
/**
 * Template Part: Home Gear2
 */

$gear_2 = get_field('gear_2');
$cta = get_field('cta');
$is_shown = $gear_2 ? $gear_2['is_shown'] : false;
?>
<?php if ($is_shown) : ?>
<section class="home_gear2">
    <header class="home_gear_header">
        <span><?php echo esc_html($gear_2['title']); ?></span>
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear2.svg')); ?>" />
    </header>
    <div class="home_gear2_upper_container">
        <h2><?php echo esc_html($gear_2['heading']); ?></h2>
        <div class="home_gear2_upper_back">
            <div class="home_gear2_upper_credits">
                <div class="credits_scroll">
                    <div class="credits_track">
                        <?php if (!empty($gear_2['partners']) && is_array($gear_2['partners'])) : ?>
                            <div class="credits_group">
                                <?php foreach ($gear_2['partners'] as $partner) : ?>
                                    <span><?php echo esc_html($partner['name']); ?></span>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <div class="lottie_img">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/globe.json')); ?>"
                        speed="1"
                        style="max-width: 472px; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
            </div>
        </div>
    </div>
<?php endif; ?>

<?php
$cta_is_shown = $cta ? $cta['is_shown'] : false;
?>
<?php
$cta_is_shown = $cta ? $cta['is_shown'] : false;
?>
<?php if ($cta_is_shown) : ?>
    <div class="home_gear2_lower_container">
        <div class="home_gear2_lower_container_nitro">
            <div class="nitro-effect">
                <img src="<?php echo esc_url(get_theme_file_uri('src/icons/nitro.png')); ?>" />
            </div>
            <span class="home_gear2_lower_container_rev">R-R-REV</span>
        </div>
        <div class="home_gear2_lower_container_lower_wrapper">
            <span>IT UP WITH IREV</span>
            <?php if ($cta['button'] && $cta['button']['text'] && $cta['button']['link']) : ?>
                <a href="<?php echo esc_url($cta['button']['link']); ?>">
                    <button><?php echo esc_html($cta['button']['text']); ?></button>
                </a>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>
</section>