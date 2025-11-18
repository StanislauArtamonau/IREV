<?php
/**
 * Template Part: Home Gear3
 */

$gear_3 = get_field('gear_3');
$is_shown = $gear_3 ? $gear_3['is_shown'] : false;
?>
<section class="home_gear3">
    <?php if ($is_shown) : ?>
    <header class="home_gear_header">
        <span><?php echo esc_html($gear_3['title']); ?></span>
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear3.svg')); ?>" />
    </header>
    <div class="home_gear3_container">
        <h2><?php echo esc_html($gear_3['heading']); ?></h2>
        <div class="home_gear3_background">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/rings1.json')); ?>"
                        speed="1"
                        style= "max-width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
        </div>
        <div class="home_gear3_clients">
            <div class="home_gear3_clients_avatar">
                <?php if (!empty($gear_3['satisfied_partners']) && is_array($gear_3['satisfied_partners'])) : ?>
                    <?php 
                    $counter = 1;
                    foreach ($gear_3['satisfied_partners'] as $index => $partner) : 
                        $selected = $counter === 4 ? 'selected' : '';
                    ?>
                    <div class="avatar-item <?php echo $selected; ?>">
                        <button data-trigger="client<?php echo $counter; ?>">
                            <?php if (!empty($partner['avatar'])) : ?>
                                <img src="<?php echo esc_url($partner['avatar']['url']); ?>" alt="<?php echo esc_attr($partner['avatar']['alt']); ?>"/>
                            <?php endif; ?>
                        </button>
                        <div class="tooltip"><?php echo esc_html($partner['name']); ?></div>
                    </div>
                    <?php 
                    $counter++;
                    endforeach; 
                    ?>
                <?php endif; ?>
            </div>
        </div>

        <div class="home_gear3_reviews">
            <?php if (!empty($gear_3['satisfied_partners']) && is_array($gear_3['satisfied_partners'])) : ?>
                <?php 
                $counter = 1;
                foreach ($gear_3['satisfied_partners'] as $partner) : 
                    $selected = $counter === 4 ? 'selected' : '';
                ?>
                <div class="home_gear3_reviews_review <?php echo $selected; ?>" data-client="client<?php echo $counter; ?>">
                    <?php if (!empty($partner['comment'])) : ?>
                        <span><?php echo esc_html($partner['comment']); ?></span>
                    <?php endif; ?>
                    <div class="client">
                        <?php if (!empty($partner['avatar'])) : ?>
                            <img src="<?php echo esc_url($partner['avatar']['url']); ?>" alt="<?php echo esc_attr($partner['avatar']['alt']); ?>"/>
                        <?php endif; ?>
                        <div class="client_info">
                            <span class="client_name"><?php echo esc_html($partner['name']); ?></span>
                            <?php if (!empty($partner['company'])) : ?>
                                <span class="client_additional"><?php echo esc_html($partner['company']); ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                <?php 
                $counter++;
                endforeach; 
                ?>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>
    <?php
$power_on_the_track = get_field('power_on_the_track');
$power_is_shown = $power_on_the_track ? $power_on_the_track['is_shown'] : false;
?>
<?php if ($power_is_shown) : ?>
    <div class="home_gear3_lower_container">
        <h2><?php echo esc_html($power_on_the_track['title']); ?></h2>
        <div class="back">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/spin.json')); ?>"
                        speed="1"
                        style= "max-width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
        </div>
        <div class="dashed_vertical"></div>
        <div class="dashed_horizontal"></div>
        <div class="lower_wrapper">
            <div class="home_gear3_lower_left">
                <div class="dashed_vertical"></div>
                <div class="label">
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playpartnersicon.svg')); ?>"/>
                    <div><?php echo esc_html($power_on_the_track['play_partners']['name']); ?></div>
                </div>
                <span><?php echo esc_html($power_on_the_track['play_partners']['paragraph']); ?></span>
                <div class="cases_wraper">
                    <div class="case">
                        <div class="dashed_vertical"></div>
                        <div class="case_label">
                            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/ftds.svg')); ?>"/>
                            <span><?php echo esc_html($power_on_the_track['play_partners']['parametr_1']['name']); ?></span>
                        </div>
                        <span><?php echo esc_html($power_on_the_track['play_partners']['parametr_1']['paragraph']); ?></span>
                    </div>

                    <div class="case">
                        <div class="dashed_vertical"></div>
                        <div class="case_label">
                            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/CR.svg')); ?>"/>
                            <span><?php echo esc_html($power_on_the_track['play_partners']['parametr_2']['name']); ?></span>
                        </div>
                        <span><?php echo esc_html($power_on_the_track['play_partners']['parametr_2']['paragraph']); ?></span>
                    </div>

                    <div class="case">
                        <div class="dashed_vertical"></div>
                        <div class="case_label">
                            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/geos.svg')); ?>"/>
                            <span><?php echo esc_html($power_on_the_track['play_partners']['parametr_3']['name']); ?></span>
                        </div>
                        <span><?php echo esc_html($power_on_the_track['play_partners']['parametr_3']['paragraph']); ?></span>
                    </div>
                </div>
                <a href="<?php echo esc_attr($power_on_the_track['play_partners']['button']['url']) ?>"><button><?php echo esc_html($power_on_the_track['play_partners']['button']['text']); ?></button></a>
            </div>
            <div class="home_gear3_lower_right">
                <div class="dashed_vertical"></div>
                <div class="label">
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playpartnersicon.svg')); ?>"/>
                    <div><?php echo esc_html($power_on_the_track['ox_tech']['name']); ?></div>
                </div>
                <span><?php echo esc_html($power_on_the_track['ox_tech']['paragraph']); ?></span>
            </div>
        </div>

        <div class="right_bottom">
            <div class="right_cases_wrapper">
                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span><?php echo esc_html($power_on_the_track['ox_tech']['parametr_1']['name']); ?></span>
                    </div>
                    <span><?php echo esc_html($power_on_the_track['ox_tech']['parametr_1']['paragraph']); ?></span>
                </div>

                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span><?php echo esc_html($power_on_the_track['ox_tech']['parametr_2']['name']); ?></span>
                    </div>
                    <span><?php echo esc_html($power_on_the_track['ox_tech']['parametr_2']['paragraph']); ?></span>
                </div>

                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span><?php echo esc_html($power_on_the_track['ox_tech']['parametr_3']['name']); ?></span>
                    </div>
                    <span><?php echo esc_html($power_on_the_track['ox_tech']['parametr_3']['paragraph']); ?></span>
                </div>
            </div>
            <a href="<?php echo esc_attr($power_on_the_track['ox_tech']['button']['url']) ?>"><button><?php echo esc_html($power_on_the_track['ox_tech']['button']['text']); ?></button></a>
        </div>
    </div>
<?php endif; ?>
</section>
