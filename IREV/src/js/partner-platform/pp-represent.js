const createParallax = require("../global");

createParallax('.partner_platform_represent', '.partner_platform_represent .back');


document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.logo_container');

    if(!container){
        return;
    }
    const originalTrack = container.querySelector('.logo_track');
    const clonedTrack = originalTrack.cloneNode(true);

    container.appendChild(clonedTrack);
});
