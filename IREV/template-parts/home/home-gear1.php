<?php
/**
 * Template Part: Home Gear1
 */

$gear_1 = get_field('gear_1');
?>
<?php if ($gear_1 && $gear_1['is_shown']) : ?>
<section class="home_gear1">
    <header class="home_gear_header">
        <span><?php echo esc_html($gear_1['title']); ?></span>
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear1.svg')); ?>" />
    </header>
    
    <?php if (!empty($gear_1['points']) && is_array($gear_1['points'])) : ?>
    <div class="home_gear1_wrapper">
        <?php 
        $counter = 1;
        foreach ($gear_1['points'] as $point) : 
            $name = $point['name'] ?? '';
            $heading = $point['heading'] ?? '';
            $paragraph = $point['paragraph'] ?? '';
        ?>
        <div class="home_gear1_info_container" data-section="<?php echo $counter; ?>">
            <span class="home_gear1_info_label">[<?php echo $counter; ?>]<?php echo esc_html($name); ?></span>
            <div class="home_gear1_info_text_container">
                <?php if ($heading) : ?>
                    <h2><?php echo esc_html($heading); ?></h2>
                <?php endif; ?>
                
                <?php if ($paragraph) : ?>
                    <span class="home_gear1_info_text_container_text">
                        <?php echo wp_kses_post($paragraph); ?>
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