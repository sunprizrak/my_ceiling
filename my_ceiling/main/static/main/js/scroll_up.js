$(function(){
    $('body').scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('#btn-up').fadeIn();
        } else {
            $('#btn-up').fadeOut();
        }
    });
    $("#btn-up").on('click', '.button', function(e){
        e.preventDefault();
        const audio = new Audio('static/main/audio/click_mouse.mp3');
        audio.play();
        $('body').animate({scrollTop: 0}, 1000);
    });
});
