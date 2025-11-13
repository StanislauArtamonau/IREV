<?php
/**
 * Template Part: Home Represent
 */

$first_screen = get_field('first_screen');
// file_put_contents(__DIR__.'/log.txt',var_export($first_screen,true)."\n", FILE_APPEND|LOCK_EX);
?>
<?php if ($first_screen['is_shown']) : ?>
<section class="home_represent">
    <div class="home_represent_upperWrapper">
        <div class="home_represent_counter">
            <span class="home_represent_counter_timer">00:03,00</span>
            <img class="home_represent_counter_red" src="<?php echo esc_url(get_theme_file_uri('src/icons/dot.svg')); ?>" alt="red dot" />
            <img class="home_represent_counter_yellow" src="<?php echo esc_url(get_theme_file_uri('src/icons/yellowDot.svg')); ?>" alt="yellow dot" />
            <img class="home_represent_counter_green" src="<?php echo esc_url(get_theme_file_uri('src/icons/greenDot.svg')); ?>" alt="green dot" />
            <span class="home_represent_counter_go">let`s Go!</span>
        </div>

        <div class="home_represent_general">
            <?php if (!empty($first_screen['heading'])) : ?>
                <h1 class="home_represent_general_slogan">
                    <?php echo esc_html($first_screen['heading']); ?>
                </h1>
            <?php endif; ?>

            <div class="home_represent_form_container">
                <form class="home_represent_form">
                    <input type="email" placeholder="Enter e-mail" class="home_represent_form_container_input" />
                    <button class="home_represent_form_container_button" type="submit">test-drive</button>
                </form>

                <?php if (!empty($first_screen['paragraph_slots'])) : ?>
                    <span><?php echo esc_html($first_screen['paragraph_slots']); ?></span>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <div class="home_represent_rate">
        <?php if (!empty($first_screen['rate_avatars'])) : ?>
            <div class="home_represent_rate_avatars">
                <?php foreach ($first_screen['rate_avatars'] as $avatar) :
                    if (!empty($avatar['avatar_photo'])) :
                        $photo = $avatar['avatar_photo'];
                ?>
                    <img src="<?php echo esc_url($photo['url']); ?>" alt="<?php echo esc_attr($photo['alt'] ?? ''); ?>" />
                <?php
                    endif;
                endforeach; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($first_screen['paragraph_rate'])) : ?>
            <img
                class="home_represent_rate_rating"
                src="<?php echo esc_url(get_theme_file_uri('src/icons/stars.svg')); ?>"
            />
            <span><?php echo esc_html($first_screen['paragraph_rate']); ?></span>
        <?php endif; ?>
    </div>

    <div class="home_represent_lowerWrapper">
        <?php if (!empty($first_screen['paragraph'])) : ?>
            <span class="home_represent_lowerWrapper_text">
                <?php echo esc_html($first_screen['paragraph']); ?>
            </span>
        <?php endif; ?>

        <?php if (!empty($first_screen['video_popup'])) :
            $video = $first_screen['video_popup']; ?>
            <div class="home_represent_lowerWrapper_video">
                <div class="video_cont">
                    <video width="100%">
                        <source src="<?php echo esc_url($video['url']); ?>" type="video/mp4">
                    </video>
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playbutton.svg')); ?>" alt="play" />
                </div>
                <div class="video_player">
                    <span>00:30</span>
                    <button>
                        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/play.svg')); ?>" alt="play" />
                    </button>
                </div>
            </div>
        <?php endif; ?>
    </div>

     <div class="home_represent_backgroundImg">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/cell.json')); ?>"
                        speed="1"
                        style= "max-width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
        </div>
</section>

<?php endif;