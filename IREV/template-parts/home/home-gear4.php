<?php
/**
 * Template Part: Home Gear4
 */

$gear_4 = get_field('gear_4');
$gear_4_is_shown = $gear_4 ? $gear_4['is_shown'] : false;

$high_performance = get_field('high_performance');
$high_performance_is_shown = $high_performance ? $high_performance['is_shown'] : false;
// file_put_contents(__DIR__.'/log.txt',var_export($high_performance,true)."\n", FILE_APPEND|LOCK_EX);
?>

<section class="home_gear4">
<?php if ($gear_4_is_shown) : ?>
    <header class="home_gear_header">
        <span><?php echo esc_html($gear_4['title']); ?></span>
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4.svg')); ?>" />
    </header>
    <div class="home_gear4_container">
        <img class="star1" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        <img class="star2" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        <img class="star3" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        <img class="star4" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        
        <?php if (!empty($gear_4['image'])) : ?>
            <img src="<?php echo esc_url($gear_4['image']['url']); ?>" alt="<?php echo esc_attr($gear_4['image']['alt']); ?>" />
        <?php endif; ?>
        
        <div class="text_wrapper">
            <span class="text_main"><?php echo esc_html($gear_4['heading']); ?></span>
            <span class="text_additional"><?php echo esc_html($gear_4['paragraph']); ?></span>
        </div>
    </div>
<?php endif; ?>

<?php if ($high_performance_is_shown) : ?>
    <div class="home_gear4_lower_container">
        <h2><?php echo esc_html($high_performance['heading']); ?></h2>
        
        <div class="home_gear4_lower_label_wrapper">
            <div class="label">
                <div class="label_upper"><?php echo esc_html($high_performance['points']['point_1']); ?></div>
                <div class="border">
                    <div class="border_vertical">
                        <div class="upper_circle circle1"></div>
                        <div class="lower_circle circle2"></div>
                    </div>
                    <div class="border_horizontal"></div>
                </div>
                <div class="label_lower"><?php echo esc_html($high_performance['points']['point_2']); ?></div>
            </div>
            <div class="border_link"></div>
            <div class="label">
                <div class="label_upper"><?php echo esc_html($high_performance['points']['point_3']); ?></div>
                <div class="border">
                    <div class="border_horizontal"></div>
                    <div class="border_vertical second">
                        <div class="upper_circle circle3"></div>
                        <div class="lower_circle circle4"></div>
                    </div>
                    <div class="border_horizontal"></div>
                </div>
                <div class="label_lower"><?php echo esc_html($high_performance['points']['point_4']); ?></div>
            </div>
            <div class="border_link"></div>
            <div class="label third">
                <div class="label_upper"><?php echo esc_html($high_performance['points']['point_5']); ?></div>
                <div class="border">
                    <div class="border_horizontal"></div>
                    <div class="border_vertical second">
                        <div class="upper_circle circle5"></div>
                    </div>
                </div>
                <div class="label_lower last">
                    <?php if (!empty($high_performance['points']['image'])) : ?>
                        <img src="<?php echo esc_url($high_performance['points']['image']['url']); ?>" alt="<?php echo esc_attr($high_performance['points']['image']['alt']); ?>" />
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <img class="gear4back" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4back.svg')); ?>" />
    </div>
<?php endif; ?>
</section>