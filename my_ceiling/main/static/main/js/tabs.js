$(document).ready(function() {
    let tabs = $('.tabs');
    let selector = $('.tabs').find('a').length;
    let activeItem = tabs.find('.active');
    let activeWidth = activeItem.innerWidth();
    let contCar = $('#content-tab .carousel');
    $("#content-tab").find("[id^='tab']").hide();
    $("#content-tab #tab1").fadeIn();
    $(".selector").css({
      "left": activeItem.position.left + "px",
      "width": activeWidth + "px"
    });

    $(".tabs").on("click","a",function(e) {
        e.preventDefault();
        if ($(this).attr('class') == 'active') {
            return;
        }
        else {
            $("#content-tab").find("[id^='tab']").hide();
            $('.tabs a').removeClass("active");
            $(this).addClass('active');
            $('#' + $(this).attr('name')).fadeIn(1500);
            let activeWidth = $(this).innerWidth();
            let itemPos = $(this).position();
            $(".selector").css({
                "left":itemPos.left + "px",
                "width": activeWidth + "px"
            });
        }
    });
});