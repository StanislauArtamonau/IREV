<?php
/**
 * Template Part: Partner Platform Component3
 */

$platform_form = get_field('platform_form');
$platform_form_is_shown = $platform_form ? $platform_form['is_shown'] : false;
?>
<?php if ($platform_form_is_shown) : ?>
<section class="partner_platform_c3">
    <h2><?php echo esc_html($platform_form['heading']); ?></h2>
     <div class="lottie_container">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/arrow.json')); ?>"
                        speed="1"
                        style= "max-width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
     </div>
    <div class="home_represent_form_container">
        <form class="home_represent_form">
            <input
                type="email"
                placeholder="Enter e-mail"
                class="home_represent_form_container_input ppc3input"
            />
            <button
                class="home_represent_form_container_button ppc3button"
                type="submit">
                take lead
            </button>
        </form>
        <span>
            <?php echo esc_html($platform_form['paragraph']); ?>
        </span>
    </div>
</section>
<?php endif; ?>