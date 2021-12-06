document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.cd-btn').addEventListener('click', (event) => {
        document.querySelector('.map').classList.remove('map_hover');
        event.currentTarget.classList.add('display_none');
        
        document.querySelectorAll('.cd-close').forEach((event) => {
            event.addEventListener('click', (event) => {
                document.querySelector('.map').classList.add('map_hover');
                document.querySelector('.cd-btn').classList.remove('display_none')
            })
        })
    })
})