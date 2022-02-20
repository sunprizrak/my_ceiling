$(function(){
    $(".navbar-nav .nav-item").on("click",".nav-link",function(e) {
        e.preventDefault();
        const audio = new Audio('static/main/audio/click_mouse.mp3');
        audio.play();
        let link = $(this).attr('data-scroll');
        $('body').animate({
            scrollTop: $('#' + link).offset().top
        }, 1000);
    });
});