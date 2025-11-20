<?php
/**
 * Template Part: Partner Platform Component5
 */
?>
<!-- proven_on_the_track_platform -->
 <!-- is_shown -->
<section class="partner_platform_c5">
        <?php
    $power_on_the_track = get_field('proven_on_the_track_platform');
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

        <div class="right_bottom">
            <div class="right_cases_wrapper">
                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span>750 %</span>
                    </div>
                    <span>
                        reduction in onboarding time
                    </span>
                </div>

                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span>$ 1-3 MLN</span>
                    </div>
                    <span>
                        discrepancy losses prevented
                    </span>
                </div>

                <div class="case">
                    <div class="dashed_vertical"></div>
                    <div class="case_label">
                        <span>20 +</span>
                    </div>
                    <span>
                        operators covered
                    </span>
                </div>
            </div>
            <button>read full case</button>
        </div>
    </div>


    <div class="home_gear4_container">
        <img
                class="star1"
                src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>"
        />
        <img
                class="star2"
                src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>"
        />
        <img
                class="star3"
                src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>"
        />
        <img
                class="star4"
                src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4star.svg')); ?>"
        />
        <img
                src="<?php echo esc_url(get_theme_file_uri('src/icons/gear4award.svg')); ?>"
        />
        <div class="text_wrapper">
            <span class="text_main">SIGMA Award Winner</span>
            <span class="text_additional">Best marketing solution provider 2024</span>
        </div>
    </div>
</section>













