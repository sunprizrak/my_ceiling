$(function(){
    $(".carousel button[name^=add-]").on('click', function(){
        const audio = new Audio('static/main/audio/add_cart.mp3');
        audio.play();
        let button_name = $(this).attr('name').split('-')[0];
        let product_id = $(this).attr('name').split('-')[1];
        let quantity = $('.carousel input[name=clg-' + product_id + ']').val();
        let it_ok = $('.carousel #it-ok' + product_id + ' svg');
        if (!it_ok.hasClass('animate')) {
            it_ok.addClass('animate');

            setTimeout(function() {
                it_ok.removeClass('animate');
            }, 1700);
        }
        $('.carousel input[name=box-' + product_id + ']').click();
        $('.carousel img[name=img-' + product_id + ']').addClass('green');
        $.ajax({
            headers: {
                'X-CSRFToken': csrftoken,
            },
            type: 'POST',
            data: {
                'name': button_name,
                'quantity': quantity,
                'product_id': product_id,
            },
            success: function(data) {
                $('#shop-cart').load(url + ' #shop-cart a');
                $('.shopping-cart .table tbody').load(url + ' .shopping-cart .table tbody tr', function(){
                    $(".table a[name^=remove-]").on('click', function(){
                        const audio = new Audio('static/main/audio/trash_can.mp3');
                        audio.play();
                        let button_name = $(this).attr('name').split('-')[0];
                        let product_id = $(this).attr('name').split('-')[1];
                        $.ajax({
                            headers: {
                                'X-CSRFToken': csrftoken,
                            },
                            type: 'POST',
                            data: {
                                'name': button_name,
                                'product_id': product_id,
                            },
                            success: function(data) {
                                $('#shop-cart').load(url + ' #shop-cart a');
                                $('.table tr[id=tr' + data.id + ']').remove();
                                $('.table #tfoot-total').remove();
                                $('.table tfoot tr th:first').after('<th scope="col" colspan="2" id="tfoot-total">' + data.total_price + ' BYN</th>');
                                $('.carousel img[name=img-' + data.id + ']').removeClass('green');
                            },
                        });
                    });
                });
                $('.table #tfoot-total').remove();
                $('.table tfoot tr th:first').after('<th scope="col" colspan="2" id="tfoot-total">' + data.total_price + ' BYN</th>');
            },
        });
    });
    $(".table a[name^=remove-]").on('click', function(){
        const audio = new Audio('static/main/audio/trash_can.mp3');
        audio.play();
        let button_name = $(this).attr('name').split('-')[0];
        let product_id = $(this).attr('name').split('-')[1];
        $.ajax({
            headers: {
                'X-CSRFToken': csrftoken,
            },
            type: 'POST',
            data: {
                'name': button_name,
                'product_id': product_id,
            },
            success: function(data) {
                $('.table tr[id=tr' + data.id + ']').remove();
                $('.table #tfoot-total').remove();
                $('.table tfoot tr th:first').after('<th scope="col" colspan="2" id="tfoot-total">' + data.total_price + ' BYN</th>');
                $('.carousel img[name=img-' + data.id + ']').removeClass('green');
                $('#shop-cart').load(url + ' #shop-cart a');
            },
        });
    });
 });



