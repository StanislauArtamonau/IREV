<?php
function IREV_scripts()
{
    $theme_version = wp_get_theme()->get('Version');
    wp_enqueue_style('IREV-style', get_template_directory_uri() . '/assets/css/main.css', [], $theme_version);
    wp_enqueue_script('IREV-script', get_template_directory_uri() . '/assets/js/main.js', [], $theme_version, true);
}
add_action('wp_enqueue_scripts', 'IREV_scripts');