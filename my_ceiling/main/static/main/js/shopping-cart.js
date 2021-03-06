function add_product() {
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
        $('.carousel input[name=clg-' + product_id + ']').val(1);
        $('.carousel span[id=clg-out' + product_id + ']').text($('.carousel input[name=box-' + product_id + ']').val() + ' BYN');
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
                    remove_product();
                    $('.table #tfoot-total').remove();
                    $('.table tfoot tr th:first').after('<th scope="col" colspan="2" id="tfoot-total">' + data.total_price + ' BYN</th>');
                });
            },
        });
    });
}

function remove_product() {
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
}

function check_price() {
    let total = new Map();
    total.set('ceiling', 0);
    $(".carousel").on('click', 'input[type=checkbox]', function() {
        total.set('ceiling', $(this).attr('name').split('-')[1]);
        $('.carousel input[name=clg-' + total.get('ceiling') + ']').change(function() {
            let clg_first_price = $('.carousel input[name=box-' + total.get('ceiling') + ']').val();
            let clg_price = clg_first_price * $(this).val();
            $('.carousel span[id=clg-out' + total.get('ceiling') + ']').text(clg_price + ' BYN');
        })
    });
}

function to_back_button() {
    $('.shopping-cart tfoot tr').on('click', 'button', function() {
        if ($('.shopping-cart-back').hasClass('turn-front')) {
            $('.shopping-cart-back').removeClass('turn-front');
        }
        $('.shopping-cart').addClass('turn-back');
        $('.shopping-cart-back').addClass('see');
    });
}

function to_front_button() {
    $('.shopping-cart-back form').on('click', 'button[name=back]', function() {
        $('.shopping-cart-back').removeClass('see');
        $('.shopping-cart-back').addClass('turn-front');
        $('.shopping-cart').removeClass('turn-back');
    });
}

function send_order_to_email() {
    $('.shopping-cart-back form').on('submit', function() {
        $.ajax({
            headers: {
                'X-CSRFToken': csrftoken,
            },
            type: 'POST',
            data: {
                'name': 'order',
                'form': $(this).serializeArray(),
            },
            success: function() {
                $('#shop-cart').load(url + ' #shop-cart a');
                $('.carousel img[name*=img]').removeClass('green');
                $('.shopping-cart .table').remove();
                $('.shopping-cart').load(url + ' .shopping-cart .table', function() {
                    to_back_button();
                });
                $('.shopping-cart-back form button[name=back]').click();
            },
        });
        return false;
    });
}

$(function() {
    check_price();
    add_product();
    remove_product();
    to_back_button();
    to_front_button();
    send_order_to_email();
});


