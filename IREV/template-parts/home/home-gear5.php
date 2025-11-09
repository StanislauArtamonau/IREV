<?php
/**
 * Template Part: Home Gear5
 */

$gear_5 = get_field('gear_5');
$gear_5_is_shown = $gear_5 ? $gear_5['is_shown'] : false;
?>
<?php if ($gear_5_is_shown) : ?>
<section class="home_gear5">
    <header class="home_gear_header">
        <span><?php echo esc_html($gear_5['title']); ?></span>
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear5.svg')); ?>" />
    </header>
    <div class="home_gear5_container">
        <h2><?php echo esc_html($gear_5['heading']); ?></h2>
        
        <?php if (!empty($gear_5['product_card']) && is_array($gear_5['product_card'])) : ?>
        <div class="home_gear5_cards_container">
            <?php 
            $card_index = 0;
            foreach ($gear_5['product_card'] as $card) : 
            ?>
            <div class="cards_card" data-card-index="<?php echo $card_index; ?>">
                <?php if (!empty($card['image'])) : ?>
                    <img src="<?php echo esc_url($card['image']['url']); ?>" alt="<?php echo esc_attr($card['image']['alt']); ?>" />
                <?php endif; ?>
                
                <div class="card_label">
                    <div class="card_label_wrapper">
                        <?php if (!empty($card['icon'])) : ?>
                            <img src="<?php echo esc_url($card['icon']['url']); ?>" alt="<?php echo esc_attr($card['icon']['alt']); ?>" />
                        <?php endif; ?>
                        <div><?php echo esc_html($card['name']); ?></div>
                    </div>
                    <span><?php echo esc_html($card['discription']); ?></span>
                </div>
                
                <?php if (!empty($card['points']) && is_array($card['points'])) : ?>
                <ul>
                    <?php 
                    $point_counter = 1;
                    foreach ($card['points'] as $point) : 
                    ?>
                    <li>
                        <span class="label_list_main">[<?php echo $point_counter; ?>] <?php echo esc_html($point['heading']); ?></span>
                        <span class="label_list_additional"><?php echo esc_html($point['paragraph']); ?></span>
                    </li>
                    <?php 
                    $point_counter++;
                    endforeach; 
                    ?>
                </ul>
                <?php endif; ?>
                
                <?php if (!empty($card['button']['heading']) && !empty($card['button']['url'])) : ?>
                    <a href="<?php echo esc_url($card['button']['url']); ?>">
                        <button><?php echo esc_html($card['button']['heading']); ?></button>
                    </a>
                <?php endif; ?>
            </div>
            <?php 
            $card_index++;
            endforeach; 
            ?>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>

    <div class="home_gear5_lower_container">
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/gear5back.svg')); ?>" />
        <h2>frequently asked questions</h2>
        <div class="home_gear5_accordion">
            <div class="accordion_item">
                <span>What is IREV?</span>
                <span class="text_opened">In technical terms,IREV is a SaaS platform that allows brands to create, track and optimize partner programs, manage leads, and increase ad campaigns conversion rates. But behind every technology, there is a group of devoted people. And these people are also IREV.</span>
                <button>
                    <img class="open" src="<?php echo esc_url(get_theme_file_uri('src/icons/accordionopen.svg')); ?>" />
                    <img class="close" src="<?php echo esc_url(get_theme_file_uri('src/icons/close.svg')); ?>" />
                </button>
            </div>
            <div class="accordion_item">
                <span>How much does IREV cost?</span>
                <span class="text_opened">In technical terms,IREV is a SaaS platform that allows brands to create, track and optimize partner programs, manage leads, and increase ad campaigns conversion rates. But behind every technology, there is a group of devoted people. And these people are also IREV.</span>
                <button>
                    <img class="open" src="<?php echo esc_url(get_theme_file_uri('src/icons/accordionopen.svg')); ?>" />
                    <img class="close" src="<?php echo esc_url(get_theme_file_uri('src/icons/close.svg')); ?>" />
                </button>
            </div>
            <div class="accordion_item">
                <span>How can I integrate IREV with my website?</span>
                <span class="text_opened">In technical terms,IREV is a SaaS platform that allows brands to create, track and optimize partner programs, manage leads, and increase ad campaigns conversion rates. But behind every technology, there is a group of devoted people. And these people are also IREV.</span>
                <button>
                    <img class="open" src="<?php echo esc_url(get_theme_file_uri('src/icons/accordionopen.svg')); ?>" />
                    <img class="close" src="<?php echo esc_url(get_theme_file_uri('src/icons/close.svg')); ?>" />
                </button>
            </div>
            <div class="accordion_item">
                <span>What types of business can benefit from IREV?</span>
                <span class="text_opened">In technical terms,IREV is a SaaS platform that allows brands to create, track and optimize partner programs, manage leads, and increase ad campaigns conversion rates. But behind every technology, there is a group of devoted people. And these people are also IREV.</span>
                <button>
                    <img class="open" src="<?php echo esc_url(get_theme_file_uri('src/icons/accordionopen.svg')); ?>" />
                    <img class="close" src="<?php echo esc_url(get_theme_file_uri('src/icons/close.svg')); ?>" />
                </button>
            </div>
            <div class="accordion_item">
                <span>Why choose IREV over other platforms?</span>
                <span class="text_opened">In technical terms,IREV is a SaaS platform that allows brands to create, track and optimize partner programs, manage leads, and increase ad campaigns conversion rates. But behind every technology, there is a group of devoted people. And these people are also IREV.</span>
                <button>
                    <img class="open" src="<?php echo esc_url(get_theme_file_uri('src/icons/accordionopen.svg')); ?>" />
                    <img class="close" src="<?php echo esc_url(get_theme_file_uri('src/icons/close.svg')); ?>" />
                </button>
            </div>
        </div>
    </div>
</section>