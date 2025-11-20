<?php
/**
 * Template Part: Partner Platform Component5
 */

$proven_on_the_track_platform = get_field('proven_on_the_track_platform');
$proven_is_shown = $proven_on_the_track_platform ? $proven_on_the_track_platform['is_shown'] : false;

$gear_4_platf = get_field('gear_4_platf');
$gear_4_platf_is_shown = $gear_4_platf ? $gear_4_platf['is_shown'] : false;
?>
<?php if ($proven_is_shown) : ?>
<section class="partner_platform_c5">
    <div class="home_gear3_lower_container">
        <h2><?php echo esc_html($proven_on_the_track_platform['title']); ?></h2>
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
                    <div><?php echo esc_html($proven_on_the_track_platform['play_partners']['name']); ?></div>
                </div>
                <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['paragraph']); ?></span>
                <div class="cases_wraper">
                    <div class="case">
                        <div class="dashed_vertical"></div>
                        <div class="case_label">
                            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/ftds.svg')); ?>"/>
                            <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['parametr_1']['name']); ?></span>
                        </div>
                        <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['parametr_1']['paragraph']); ?></span>
                    </div>

                    <div class="case">
                        <div class="dashed_vertical"></div>
                        <div class="case_label">
                            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/CR.svg')); ?>"/>
                            <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['parametr_2']['name']); ?></span>
                        </div>
                        <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['parametr_2']['paragraph']); ?></span>
                    </div>

                    <div class="case">
                        <div class="dashed_vertical"></div>
                        <div class="case_label">
                            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/geos.svg')); ?>"/>
                            <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['parametr_3']['name']); ?></span>
                        </div>
                        <span><?php echo esc_html($proven_on_the_track_platform['play_partners']['parametr_3']['paragraph']); ?></span>
                    </div>
                </div>
                <?php if (!empty($proven_on_the_track_platform['play_partners']['button']['heading']) && !empty($proven_on_the_track_platform['play_partners']['button']['url'])) : ?>
                    <a href="<?php echo esc_url($proven_on_the_track_platform['play_partners']['button']['url']); ?>">
                        <button><?php echo esc_html($proven_on_the_track_platform['play_partners']['button']['heading']); ?></button>
                    </a>
                <?php endif; ?>
            </div>
            <div class="home_gear3_lower_right">
                <div class="dashed_wrapper">
                    <div class="dashed_label_wrapper">
                        <div class="dashed_vertical first"></div>
                        <div class="label"><?php echo esc_html($proven_on_the_track_platform['winning_trust']['name']); ?></div>
                        <span><?php echo esc_html($proven_on_the_track_platform['winning_trust']['paragraph']); ?></span>
                    </div>
                    <div class="dashed_vertical"></div>
                </div>
                <div class="label">
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playpartnersicon.svg')); ?>"/>
                    <div><?php echo esc_html($proven_on_the_track_platform['ox_tech']['name']); ?></div>
                </div>
                <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['paragraph']); ?></span>
            </div>
        </div>

        <div class="right_bottom">
            <div class="right_cases_wrapper">
                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['parametr_1']['name']); ?></span>
                    </div>
                    <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['parametr_1']['paragraph']); ?></span>
                </div>

                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['parametr_2']['name']); ?></span>
                    </div>
                    <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['parametr_2']['paragraph']); ?></span>
                </div>

                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['parametr_3']['name']); ?></span>
                    </div>
                    <span><?php echo esc_html($proven_on_the_track_platform['ox_tech']['parametr_3']['paragraph']); ?></span>
                </div>
            </div>
            <?php if (!empty($proven_on_the_track_platform['ox_tech']['button']['heading']) && !empty($proven_on_the_track_platform['ox_tech']['button']['url'])) : ?>
                <a href="<?php echo esc_url($proven_on_the_track_platform['ox_tech']['button']['url']); ?>">
                    <button><?php echo esc_html($proven_on_the_track_platform['ox_tech']['button']['heading']); ?></button>
                </a>
            <?php endif; ?>
        </div>
    </div>
<?php endif; ?>

<?php if ($gear_4_platf_is_shown) : ?>
    <div class="home_gear4_container">
        <img class="star1" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        <img class="star2" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        <img class="star3" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        <img class="star4" src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>" />
        
        <?php if (!empty($gear_4_platf['image'])) : ?>
            <img src="<?php echo esc_url($gear_4_platf['image']['url']); ?>" alt="<?php echo esc_attr($gear_4_platf['image']['alt']); ?>" />
        <?php endif; ?>
        
        <div class="text_wrapper">
            <span class="text_main"><?php echo esc_html($gear_4_platf['heading']); ?></span>
            <span class="text_additional"><?php echo esc_html($gear_4_platf['paragraph']); ?></span>
        </div>
    </div>
<?php endif; ?>
</section>