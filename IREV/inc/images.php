<?php function allow_svg_upload($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');

function allow_video_mimes($mimes) {
    $mimes['mp4'] = 'video/mp4';
    $mimes['mov'] = 'video/quicktime';
    $mimes['avi'] = 'video/x-msvideo';
    $mimes['webm'] = 'video/webm';
    return $mimes;
}
add_filter('upload_mimes', 'allow_video_mimes');