document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    document.getElementById('next').addEventListener('click', function() {
        items[currentIndex].classList.add('hidden');
        currentIndex = (currentIndex + 1) % totalItems;
        items[currentIndex].classList.remove('hidden');
    });

    document.getElementById('prev').addEventListener('click', function() {
        items[currentIndex].classList.add('hidden');
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        items[currentIndex].classList.remove('hidden');
    });
});
