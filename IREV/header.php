<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header>
    <div class="header_wrapper">
        <div class="header_logo">
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/logo.svg')); ?>"
                 alt="irev logo"/>
        </div>
        <div class="header_menu">
            <div class="header_menu_item">
                Product
                <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                     alt="arrow"
                />
            </div>
            <div class="header_menu_item">
                Solution
                <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                     alt="arrow"
                />
            </div>
            <div class="header_menu_item">
                Pricing
            </div>
            <div class="header_menu_item">
                Resources
                <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                     alt="arrow"
                />
            </div>
            <div class="header_menu_item">
                Company
                <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                     alt="arrow"
                />
            </div>
        </div>
        <button class="header_signIn">
            Sign In
        </button>
    </div>
</header>

