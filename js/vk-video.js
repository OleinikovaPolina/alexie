"use strict";

window.addEventListener('load', function () {
  document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-135841332&id=456239063&hash=9e0840aa6d331cdd&hd=4&autoplay=1';

  document.querySelector(".vk-video-wrap").addEventListener('click', function () {
    document.querySelector('.vk-video').classList.add('d-block');
    document.querySelector('.close-img').classList.add('d-block');
    document.querySelector('.btn-for-menu').classList.add('d-none');
    let t = document.querySelectorAll(".menu");
    for (let i = 0; i < t.length; i++) {
      t[i].style.zIndex = "0";
    }
    // document.querySelectorAll('.menu').forEach(function (el) {
    //   el.style.zIndex = "0";
    // });
  });
  document.querySelector('.close-img').addEventListener('click', function (event) {
    event.currentTarget.classList.remove('d-block');
    document.querySelector('.vk-video').classList.remove('d-block');
    document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-135841332&id=456239063&hash=9e0840aa6d331cdd&hd=4';
    document.querySelector('.btn-for-menu').classList.remove('d-none');
    let t = document.querySelectorAll(".menu");
    for (let i = 0; i < t.length; i++) {
      t[i].style.zIndex = "4";
    }
  });
});