<?php
/**
 * Template Part: Home Represent Popup
 */
?>

<div class="home_popup_overlay">
    <div class="home_popup_content">
            <div class="home_popup_content_upper">
                <div class="home_popup_content_label">
                    <div class="home_popup_content_label_wrapper">
                        <span>Hurry up</span>
                        <span
                                class="home_popup_content_label_wrapper_counter">
                        00:15:00
                    </span>
                    </div>
                    <span>20% discount for the first month</span>
                </div>
                <button><img src="<?php echo esc_url(get_theme_file_uri('src/icons/cancel.svg')); ?>" alt="cancel"/></button>
            </div>
        <h2>Irev puts your partner program on the fast track to real growth</h2>
        <div class="home_popup_content_lower">
            <!-- <form>
                <div class="home_popup_content_form_inputs">
                    <input type="text" placeholder="Business name"/>
                    <input type="text" placeholder="Name"/>
                    <input type="email" placeholder="E-mail"/>
                    <input type="url" placeholder="Telegram / WatsApp"/>
                    <input type="number" placeholder="+ Phone Number"/>
                    <input type="text" placeholder="Vertical"/>
                    <input type="text" placeholder="I am looking for"/>
                </div>
                <button id="submitButton">get walkthrough</button>
                <div class="home_popup_content_form_container">
                    <div class="home_popup_content_form_checkbox">
                        <label class="checkbox">
                            <input type="checkbox" id="policyCheckbox">
                        </label>
                        <span>By signing up you agree to <a>IREV Policy</a></span>
                    </div>
                    <div class="home_popup_content_form_checkbox">
                        <label class="checkbox">
                            <input type="checkbox" id="agreeCheckbox">
                        </label>
                        <span>I agree to receive promotional texts</span>
                    </div>
                </div>
            </form>  -->
            <?php echo do_shortcode('[contact-form-7 id="332aa47" title="Home Present Popup"]'); ?>
            <div class="home_popup_content_lower_rightcont">
                <div class="home_popup_content_lower_rightcont_video">
                    <video width="100%" id="popupVideo">
                        <source src="<?php echo esc_url(get_theme_file_uri('src/video/sample-15s.mp4')); ?>" type="video/mp4">
                    </video>
                        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playbutton.svg')); ?>" alt="play" />
                </div>
                <span>Watch IREV live review now [2 min]</span>
                <div class="home_popup_content_lower_rightcont_lower">
                    <div class="home_popup_content_lower_rightcont_lower_phrase">
                        <span>
                            IREV covers everything for the convenient and effective management of affiliate programs. We've been very happy with the platform and support from day one.
                        </span>
                        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/danielgram.svg')); ?>" alt="daniel" />
                    </div>
                    <div class="home_popup_content_lower_rightcont_lower_award">
                        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/award.svg')); ?>" alt="award" />
                        <span class="home_popup_content_lower_rightcont_lower_award_title">SIGMA Award Winner</span>
                        <span class="home_popup_content_lower_rightcont_lower_award_text">Best marketing solution provider 2024</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal-overlay" id="modalOverlay">
    <div class="modal">
        <div class="modal-video">
            <video width="100%">
                <source src="<?php echo esc_url(get_theme_file_uri('src/video/sample-15s.mp4')); ?>" type="video/mp4">
            </video>
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playbutton.svg')); ?>" alt="play" />
        </div>
        <form class="modal-form">
            <input type="email" class="form-input" placeholder="Enter e-mail">
            <button class="form-button">TALK TO SALES</button>
        </form>
    </div>
</div>

