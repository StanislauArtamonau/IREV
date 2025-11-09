<?php
/**
 * Template name: Case Page
 * Template Post Type: page
 */
get_header(); ?>
    <main class="home_main case">
        <?php get_template_part('template-parts/case/case-represent'); ?>
        <?php get_template_part('template-parts/case/case-component2'); ?>
        <?php get_template_part('template-parts/case/case-component-finish'); ?>
        <?php get_template_part('template-parts/home/home-represent-popup'); ?>
    </main>
<?php
get_footer(); ?>