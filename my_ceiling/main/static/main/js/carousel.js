window.addEventListener("DOMContentLoaded", () => {
    let carousels = document.querySelectorAll(".carousel");
    for (var i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});

function carousel(root) {
    let figure = root.querySelector("figure"),
    nav = root.querySelector("nav"),
    images = figure.children,
    n = images.length,
    gap = root.dataset.gap || 0,
    bfc = "bfc" in root.dataset,
    theta = 2 * Math.PI / n,
    currImage = 0;
    /*prevImage = n - 1,
    nextImage = currImage + 1,
    count_touch = 0;*/
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener("resize", () => {
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    });
    setupNavigation();
    function setupCarousel(n, s) {
        let apothem = s / (1.8 * Math.tan(Math.PI / n));
        figure.style.transformOrigin = `50% 50% ${-apothem}px`;
        for (i = 0; i < n; i++) {
            images[i].style.padding = `0 ${gap}px`;
            images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        if (bfc) {
            for (i = 0; i < n; i++) {
                images[i].style.backfaceVisibility = "hidden";
            }
        }
        /*for (i = 0; i < n; i++) {
            if (i == currImage || i == prevImage || i == nextImage) {
                images[i].querySelector('hr').classList.add('active-hr');
            }
        }*/
        rotateCarousel(currImage);
    }
    function setupNavigation() {
        nav.addEventListener("click", onClick, true);
        function onClick(e) {
            e.stopPropagation();
            const audio = new Audio('static/main/audio/carousel_scroll.mp3');
            audio.play();
            let t = e.target;
            if (t.tagName.toUpperCase() != "IMG") return;
            if (t.classList.contains("next")) {
                currImage++;
                /*count_touch++;
                if (count_touch == n) {
                    count_touch = 0;
                    prevImage = n - 1;
                    nextImage = count_touch + 1;
                } else if (count_touch == n - 1) {
                    prevImage = count_touch - 1;
                    nextImage = 0;
                } else {
                    prevImage = count_touch - 1;
                    nextImage = count_touch + 1;
                }*/
            } else {
                currImage--;
                /*count_touch--;
                if (count_touch == -1) {
                    count_touch = n - 1;
                    nextImage = 0;
                    prevImage = count_touch - 1;
                } else if (count_touch == 0) {
                    prevImage = n - 1;
                    nextImage = count_touch + 1;
                } else {
                    prevImage = count_touch - 1;
                    nextImage = count_touch + 1;
                }*/
            }
            /*for (i = 0; i < n; i++) {
                if (i == count_touch || i == prevImage || i == nextImage) {
                    images[i].querySelector('hr').classList.add('active-hr');
                } else {
                    images[i].querySelector('hr').classList.remove('active-hr');
                }
            }*/
            rotateCarousel(currImage);
        }
    }
    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
}