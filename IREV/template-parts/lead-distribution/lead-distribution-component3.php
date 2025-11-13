<?php
/**
 * Template Part: Lead Distribution Component3
 */
?>

<section class="lead_distribution_c3">
     <div class="ld_c3_back">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/flag.json')); ?>"
                        speed="1"
                        style= "max-width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
    </div>
    <div class="ld_c3_wrapper">
        <h2>You’ve seen the track. Now take the wheel</h2>
        <div class="home_represent_form_container">
            <form class="home_represent_form">
                <input
                        type="email"
                        placeholder="Enter e-mail"
                        class="home_represent_form_container_input ldc3input"
                />
                <button
                        class="home_represent_form_container_button ldc3button"
                        type="submit">
                    start driving
                </button>
            </form>
        </div>
    </div>
</section>
