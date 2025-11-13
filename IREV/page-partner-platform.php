<?php
/**
 * Template name: Partner Platform Page
 * Template Post Type: page
 */
get_header(); ?>
    <main class="home_main pp">
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <?php get_template_part('template-parts/partner-platform/partner-platform-represent'); ?>
        <?php get_template_part('template-parts/partner-platform/partner-platform-list'); ?>
        <?php get_template_part('template-parts/partner-platform/partner-platform-component3'); ?>
        <?php get_template_part('template-parts/partner-platform/partner-platform-reviews'); ?>
        <?php get_template_part('template-parts/partner-platform/partner-platform-component5'); ?>
        <?php get_template_part('template-parts/partner-platform/partner-platform-component6'); ?>
        <?php get_template_part('template-parts/partner-platform/partner-platform-faq'); ?>
        <?php get_template_part('template-parts/home/home-represent-popup'); ?>
    </main>
<?php
get_footer(); ?>