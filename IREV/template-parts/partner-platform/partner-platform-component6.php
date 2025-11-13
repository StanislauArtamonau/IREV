<?php
/**
 * Template Part: Partner Platform Component6
 */
?>

<section class="partner_platform_c6">
    <div class="pp_c6_cont">
        <img src="<?php echo esc_url(get_theme_file_uri('src/icons/ppc6backv2.svg')); ?>"/>
        <div class="lottie_container">
                <lottie-player
                        src="<?php echo esc_url(get_theme_file_uri('src/animations/car.json')); ?>"
                        speed="1"
                        style= "width: 100%; background: transparent"
                        loop
                        autoplay>
                </lottie-player>
        </div>
        <div class="form_container">
            <h2>Cost check before green light</h2>
            <div class="form_item">
                <span>Conversions per month</span>
                <input type="number" id="conversions" placeholder="30 000" min="0" />
            </div>
            <div class="form_item">
                <span>Clicks per month</span>
                <input type="number" id="clicks" placeholder="1000 000" min="0" />
            </div>
            <div class="form_item">
                <span>Turnover of funds</span>
                <input type="number" id="funds" placeholder="$ 50 000" min="7000" />
            </div>
            <div class="funds">
                <span>Starting from </span><div id="result">0%</div> <span>of turnover</span>
            </div>
            <div class="form_input_container">
                <div>
                    <span>E-mail</span>
                    <input type="email" placeholder="enter@email.com"/>
                </div>
                <button>get special price</button>
            </div>
        </div>
    </div>

    <h3>Ready to race? Start scaling with Partner platform</h3>
</section>