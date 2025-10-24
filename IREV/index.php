<?php
/**
 * Template name: Home Page
 * Template Post Type: page
 */
get_header(); ?>
<main class="home_main home">
    <?php get_template_part('template-parts/home/home-represent'); ?>
    <?php get_template_part('template-parts/home/home-gear1'); ?>
    <?php get_template_part('template-parts/home/home-gear2'); ?>
    <?php get_template_part('template-parts/home/home-gear3'); ?>
    <?php get_template_part('template-parts/home/home-gear4'); ?>
    <?php get_template_part('template-parts/home/home-gear5'); ?>
    <?php get_template_part('template-parts/home/home-gear6'); ?>
    <?php get_template_part('template-parts/home/home-represent-popup'); ?>
</main>
<?php
get_footer(); ?>