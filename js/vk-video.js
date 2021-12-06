window.addEventListener('load', () => {
    document.querySelector(".vk-video-wrap").addEventListener('click', () => {
        document.querySelector('.vk-video').classList.add('d-block');
        document.querySelector('.close-img').classList.add('d-block');
        document.querySelector('.btn-for-menu').classList.add('d-none');
        document.querySelectorAll('.menu').forEach(el => {
            el.style.zIndex = "0";
        });
    })
    document.querySelector('.close-img').addEventListener('click', (event) => {
        event.currentTarget.classList.remove('d-block')
        document.querySelector('.vk-video').classList.remove('d-block');
        document.querySelector('.vk-video').src='https://vk.com/video_ext.php?oid=-135841332&id=456239063&hash=9e0840aa6d331cdd&hd=4&autoplay=1';
        document.querySelector('.btn-for-menu').classList.remove('d-none');
        document.querySelectorAll('.menu').forEach(el => {
            el.style.zIndex = "4";
        });
    })
})