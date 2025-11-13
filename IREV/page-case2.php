<?php
/**
 * Template name: Case Page Second
 * Template Post Type: page
 */
get_header(); ?>
    <main class="home_main case">
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <?php get_template_part('template-parts/case2/case2-represent'); ?>
        <?php get_template_part('template-parts/case2/case2-component2'); ?>
        <?php get_template_part('template-parts/case2/case2-component-finish'); ?>
        <?php get_template_part('template-parts/home/home-represent-popup'); ?>
    </main>
<?php
get_footer(); ?>