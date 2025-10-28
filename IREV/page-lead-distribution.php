<?php
/**
 * Template name: Lead Distribution Page
 * Template Post Type: page
 */
get_header(); ?>
    <main class="home_main">
        <?php get_template_part('template-parts/lead-distribution/lead-distribution-represent'); ?>
        <?php get_template_part('template-parts/lead-distribution/lead-distribution-component2'); ?>
        <?php get_template_part('template-parts/lead-distribution/lead-distribution-component3'); ?>
        <?php get_template_part('template-parts/lead-distribution/lead-distribution-component4'); ?>
        <?php get_template_part('template-parts/lead-distribution/lead-distribution-component5'); ?>
        <?php get_template_part('template-parts/lead-distribution/lead-distribution-finish'); ?>
        <?php get_template_part('template-parts/home/home-represent-popup'); ?>
    </main>
<?php
get_footer(); ?>