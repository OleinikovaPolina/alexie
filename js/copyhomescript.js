"use strict";

window.addEventListener('load', function () {
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
        document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-135841332&id=456239063&hash=9e0840aa6d331cdd&hd=4&autoplay=1';
    });
});