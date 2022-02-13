$(function(){
    $(".carousel button[name^=add-]").on('click', function(e){
        e.preventDefault();
        let button_name = $(this).attr('name').split('-')[0];
        let product_id = $(this).attr('name').split('-')[1];
        let quantity = $('.carousel input[name=clg-' + product_id + ']').val();
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
                $('.shopping-cart .table tbody').load(url + ' .shopping-cart .table tbody tr', function(){
                    $(".table a[name^=remove-]").on('click', function(){
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
                                $('.table tfoot tr th:last').after('<th scope="col" id="tfoot-total">' + data.total_price + ' BYN</th>');
                                $('.carousel img[name=img-' + data.id + ']').removeClass('green');
                            },
                        });
                    });
                });
                $('.table #tfoot-total').remove();
                $('.table tfoot tr th:last').after('<th scope="col" id="tfoot-total">' + data.total_price + ' BYN</th>');
            },
        });
    });
    $(".table a[name^=remove-]").on('click', function(){
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
                $('.table tfoot tr th:last').after('<th scope="col" id="tfoot-total">' + data.total_price + ' BYN</th>');
                $('.carousel img[name=img-' + data.id + ']').removeClass('green');
            },
        });
    });
 });



