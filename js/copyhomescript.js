"use strict";

window.addEventListener('load', function () {
    let t = document.querySelectorAll(".lll");
    for (let i = 0; i < t.length; i++) {
        t[i].addEventListener('click', function () {
            if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
                //ie
                document.querySelector('.vk-videoIE').src = '/video/АлександрНевскийVR.mp4';
                document.querySelector('.vk-videoIE').classList.add('d-block');
                document.querySelector('.vk-videoIE').classList.play();
            } else {
                document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-41185682&id=456239054&hash=a396983a15039fa1&hd=4&autoplay=1';
                document.querySelector('.vk-video').classList.add('d-block');
            }
            document.querySelector('.close-img').classList.add('d-block');
        });
    }
    document.querySelector('.close-img').addEventListener('click', function (event) {
        if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            document.querySelector('.vk-videoIE').pause()
            document.querySelector('.vk-videoIE').classList.remove('d-block');
        } else {
            document.querySelector('.vk-video').classList.remove('d-block');
            document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-41185682&id=456239054&hash=a396983a15039fa1&hd=4&';
        }
        document.querySelector('.close-img').classList.remove('d-block');

    });
});