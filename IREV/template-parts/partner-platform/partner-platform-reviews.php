<?php
/**
 * Template Part: Partner Platform Reviews
 */

$comments = get_field('comments');
$comments_is_shown = $comments ? $comments['is_shown'] : false;
?>
<?php if ($comments_is_shown) : ?>
<section class="partner_platform_reviews">
    <div class="home_gear3_container">
        <div class="home_gear3_clients">
            <span><?php echo esc_html($comments['paragraph']); ?></span>
            <div class="home_gear3_clients_avatar">
                <?php if (!empty($comments['people']) && is_array($comments['people'])) : ?>
                    <?php 
                    $counter = 1;
                    foreach ($comments['people'] as $person) : 
                        $selected = $counter === 4 ? 'selected' : '';
                    ?>
                    <div class="avatar-item <?php echo $selected; ?>">
                        <button data-trigger="client<?php echo $counter; ?>">
                            <?php if (!empty($person['avatar'])) : ?>
                                <img src="<?php echo esc_url($person['avatar']['url']); ?>" alt="<?php echo esc_attr($person['avatar']['alt']); ?>"/>
                            <?php endif; ?>
                        </button>
                        <div class="tooltip"><?php echo esc_html($person['name']); ?></div>
                    </div>
                    <?php 
                    $counter++;
                    endforeach; 
                    ?>
                <?php endif; ?>
            </div>
        </div>

        <div class="home_gear3_reviews">
            <?php if (!empty($comments['people']) && is_array($comments['people'])) : ?>
                <?php 
                $counter = 1;
                foreach ($comments['people'] as $person) : 
                    $selected = $counter === 4 ? 'selected' : '';
                ?>
                <div class="home_gear3_reviews_review <?php echo $selected; ?>" data-client="client<?php echo $counter; ?>">
                    <?php if (!empty($person['comment'])) : ?>
                        <span><?php echo esc_html($person['comment']); ?></span>
                    <?php endif; ?>
                    <div class="client">
                        <?php if (!empty($person['avatar'])) : ?>
                            <img src="<?php echo esc_url($person['avatar']['url']); ?>" alt="<?php echo esc_attr($person['avatar']['alt']); ?>"/>
                        <?php endif; ?>
                        <div class="client_info">
                            <span class="client_name"><?php echo esc_html($person['name']); ?></span>
                            <?php if (!empty($person['company'])) : ?>
                                <span class="client_additional"><?php echo esc_html($person['company']); ?></span>
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

    <div class="logo_container">
        <div class="logo_track">
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/bullsmedia.svg')); ?>"/>
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/oxtech.svg')); ?>"/>
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/exness.svg')); ?>"/>
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/playpartners.svg')); ?>"/>
        </div>
    </div>
</section>
<?php endif; ?>