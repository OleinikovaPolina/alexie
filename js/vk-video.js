"use strict";

window.addEventListener('load', function () {
  document.querySelector(".vk-video-wrap").addEventListener('click', function () {
    document.querySelector('.vk-video').classList.add('d-block');
    document.querySelector('.close-img').classList.add('d-block');
    document.querySelector('.btn-for-menu').classList.add('d-none');
    document.querySelectorAll('.menu').forEach(function (el) {
      el.style.zIndex = "0";
    });
  });
  document.querySelector('.close-img').addEventListener('click', function (event) {
    event.currentTarget.classList.remove('d-block');
    document.querySelector('.vk-video').classList.remove('d-block');
    document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-13695781&id=456239507&hash=bc33811e79c66d35';
    document.querySelector('.btn-for-menu').classList.remove('d-none');
    document.querySelectorAll('.menu').forEach(function (el) {
      el.style.zIndex = "4";
    });
  });
});