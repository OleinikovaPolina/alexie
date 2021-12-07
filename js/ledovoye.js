"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('.cd-btn').addEventListener('click', function (event) {
    document.querySelector('.map').classList.remove('map_hover');
    event.currentTarget.classList.add('display_none');
    var t = document.querySelectorAll('.cd-close');

    for (var i = 0; i < t.length; i++) {
      t[i].addEventListener('click', function (event) {
        document.querySelector('.map').classList.add('map_hover');
        document.querySelector('.cd-btn').classList.remove('display_none');
      });
    } // document.querySelectorAll('.cd-close').forEach((event) => {
    //     event.addEventListener('click', (event) => {
    //         document.querySelector('.map').classList.add('map_hover');
    //         document.querySelector('.cd-btn').classList.remove('display_none')
    //     })
    // })

  });
});
