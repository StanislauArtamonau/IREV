<?php
/**
 * Template Part: Partner Platform Represent
 */

$first_screen_platform = get_field('first_screen_platform');
$first_screen_platform_is_shown = $first_screen_platform ? $first_screen_platform['is_shown'] : false;
?>
<?php if ($first_screen_platform_is_shown) : ?>
<section class="partner_platform_represent">
     <div class="back">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/rings2.json')); ?>"
                        speed="1"
                        style= "max-width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
     </div>
    <div class="represent_label">
        <h1><?php echo esc_html($first_screen_platform['heading']); ?></h1>
        <span><?php echo esc_html($first_screen_platform['paragraph']); ?></span>
    </div>
    <div class="home_represent_rate">
        <div class="home_represent_rate_avatars">
            <?php if (!empty($first_screen_platform['avatars']) && is_array($first_screen_platform['avatars'])) : ?>
                <?php foreach ($first_screen_platform['avatars'] as $avatar) : ?>
                    <?php if (!empty($avatar['photo'])) : ?>
                        <img src="<?php echo esc_url($avatar['photo']['url']); ?>" alt="<?php echo esc_attr($avatar['photo']['alt']); ?>" />
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <img
            class="home_represent_rate_rating"
            src="<?php echo esc_url(get_theme_file_uri('src/icons/stars.svg')); ?>"
        />
        <span>
            <?php echo esc_html($first_screen_platform['avatar_paragraph']); ?>
        </span>
    </div>

    <div class="home_represent_form_container">
        <form class="home_represent_form">
            <input
                    type="email"
                    placeholder="Enter e-mail"
                    class="home_represent_form_container_input"
            />
            <button
                    class="home_represent_form_container_button"
                    type="submit">
                REV UP
            </button>
        </form>
        <span>
            <?php echo esc_html($first_screen_platform['form_paragraph']); ?>
        </span>
    </div>

    <span class="represent_text_lower"><?php echo esc_html($first_screen_platform['low_paragraph']); ?></span>
</section>
<?php endif; ?>