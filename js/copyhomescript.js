window.addEventListener('load', () => {
    document.querySelectorAll(".lll").forEach(el => {
        el.addEventListener('click', () => {
            console.log('f')
            document.querySelector('.vk-video').classList.add('d-block');
            document.querySelector('.close-img').classList.add('d-block');
        })
    })
    document.querySelector('.close-img').addEventListener('click', (event) => {
        document.querySelector('.close-img').classList.remove('d-block')
        document.querySelector('.vk-video').classList.remove('d-block');
        document.querySelector('.vk-video').src = 'https://vk.com/video_ext.php?oid=-135841332&id=456239063&hash=9e0840aa6d331cdd&hd=4&autoplay=1';
    })
})