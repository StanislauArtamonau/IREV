<?php
/**
 * Template Part: Partner Platform FAQ
 */

$faq_block = get_field('faq_platf');
$faq_block_is_shown = $faq_block ? $faq_block['is_shown'] : false;

$check_lead = get_field('check_lead');
$check_lead_is_shown = $check_lead ? $check_lead['is_shown'] : false;
?>
<section class="partner_platform_faq">
    <?php if ($faq_block_is_shown) : ?>
    <div class="home_gear5_lower_container">
        <h2><?php echo esc_html($faq_block['title']); ?></h2>
        
        <?php if (!empty($faq_block['questions_platf']) && is_array($faq_block['questions_platf'])) : ?>
        <div class="home_gear5_accordion">
            <?php foreach ($faq_block['questions_platf'] as $question) : ?>
            <div class="accordion_item">
                <span><?php echo esc_html($question['heading']); ?></span>
                <span class="text_opened"><?php echo esc_html($question['paragraph']); ?></span>
                <button>
                    <img class="open" src="<?php echo esc_url(get_theme_file_uri('src/icons/accordionopen.svg')); ?>" />
                    <img class="close" src="<?php echo esc_url(get_theme_file_uri('src/icons/close.svg')); ?>" />
                </button>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>

    <?php if ($check_lead_is_shown) : ?>
    <div class="home_gear6_container">
        <h2><?php echo esc_html($check_lead['heading']); ?></h2>
        
        <?php if (!empty($check_lead['button']['heading']) && !empty($check_lead['button']['url'])) : ?>
            <a href="<?php echo esc_url($check_lead['button']['url']); ?>">
                <button class="open_modal"><?php echo esc_html($check_lead['button']['heading']); ?></button>
            </a>
        <?php endif; ?>

        <div class="lottie_container">
            <lottie-player
                src="<?php echo esc_url(get_theme_file_uri('src/animations/pixelcar.json')); ?>"
                speed="1"
                style="width: 100%; height: auto; background: transparent"
                loop
                autoplay>
            </lottie-player>
        </div>
    </div>
    <?php endif; ?>
</section>