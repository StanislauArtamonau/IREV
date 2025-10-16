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
        <div>
            <img class="header_logo" src="<?php echo esc_url(get_theme_file_uri('src/icons/logo.svg')); ?>"
                 alt="irev logo"/>
        </div>
        <nav class="header_nav">
            <div class="header_menu">
                <div class="header_menu_item" data-dropdown-trigger="product">
                    <button>
                        Product
                    </button>
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_unselected"
                    />
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/arrowSelected.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_selected"
                    />
                </div>
                <div class="header_menu_item" data-dropdown-trigger="solution">
                    <button>
                        Solution
                    </button>
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_unselected"
                    />
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/arrowSelected.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_selected"
                    />
                </div>
                <div class="header_menu_item">
                        Pricing
                </div>
                <div class="header_menu_item" data-dropdown-trigger="resources">
                    <button>
                        Resources
                    </button>
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_unselected"
                    />
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/arrowSelected.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_selected"
                    />
                </div>
                <div class="header_menu_item" data-dropdown-trigger="company">
                    <button>
                        Company
                    </button>
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/miniArrow.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_unselected"
                    />
                    <img src="<?php echo esc_url(get_theme_file_uri('src/icons/arrowSelected.svg')); ?>"
                         alt="arrow"
                         class="header_menu_item_arrow_selected"
                    />
                </div>
            </div>
            <div class="nav_dropdown_container">
                <div class="nav_dropdown" data-dropdown-content="product">
                    <a>Lead Distribution</a>
                    <a>Partner Platform</a>
                </div>
                <div class="nav_dropdown" data-dropdown-content="solution">
                    <a>IGaming & Casino</a>
                </div>
                <div class="nav_dropdown" data-dropdown-content="resources">
                    <a>Blog</a>
                    <a>Affiliate Marketing Glossary</a>
                </div>
                <div class="nav_dropdown" data-dropdown-content="company">
                    <a>About us</a>
                    <a>Career</a>
                    <a>Contact us</a>
                </div>
            </div>
        </nav>
        <button class="header_signIn">
            Sign In
        </button>
        <button class="header_hamburger">
            <img src="<?php echo esc_url(get_theme_file_uri('src/icons/hamburgerIcon.svg')); ?>"
                 alt="hamburger"
            />
        </button>
    </div>
</header>

