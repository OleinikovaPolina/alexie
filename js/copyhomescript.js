"use strict";

window.addEventListener('load', function () {
    document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-41185682&id=456239054&hash=a396983a15039fa1&hd=4&autoplay=1';
    let t = document.querySelectorAll(".lll");
    for (let i = 0; i < t.length; i++) {
        t[i].addEventListener('click', function () {
            document.querySelector('.vk-video').classList.add('d-block');
            document.querySelector('.close-img').classList.add('d-block');
        });
    }
    document.querySelector('.close-img').addEventListener('click', function (event) {
        document.querySelector('.close-img').classList.remove('d-block');
        document.querySelector('.vk-video').classList.remove('d-block');
        document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-41185682&id=456239054&hash=a396983a15039fa1&hd=4&';
    });
});