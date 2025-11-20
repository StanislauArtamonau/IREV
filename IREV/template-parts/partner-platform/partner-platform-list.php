<?php
/**
 * Template Part: Partner Platform List
 */

$revenue_stays = get_field('revenue_stays');
$revenue_stays_is_shown = $revenue_stays ? $revenue_stays['is_shown'] : false;
?>
<?php if ($revenue_stays_is_shown) : ?>
<section class="partner_platform_list">
    <h2><?php echo esc_html($revenue_stays['heading']); ?></h2>
    
    <?php if (!empty($revenue_stays['revenue_blocks']) && is_array($revenue_stays['revenue_blocks'])) : ?>
    <div class="home_gear1_wrapper">
        <?php 
        $counter = 1;
        foreach ($revenue_stays['revenue_blocks'] as $block) : 
        ?>
        <div class="home_gear1_info_container" data-section="<?php echo $counter; ?>">
            <span class="home_gear1_info_label">[<?php echo $counter; ?>]<?php echo esc_html($block['title']); ?></span>
            <div class="home_gear1_info_text_container">
                <?php if (!empty($block['heading'])) : ?>
                    <h2><?php echo esc_html($block['heading']); ?></h2>
                <?php endif; ?>
                
                <?php if (!empty($block['paragraph'])) : ?>
                    <span class="home_gear1_info_text_container_text">
                        <?php echo wp_kses_post($block['paragraph']); ?>
                    </span>
                <?php endif; ?>
            </div>
        </div>
        <?php 
        $counter++;
        endforeach; 
        ?>
    </div>
    <?php endif; ?>
</section>
<?php endif; ?>