$(function() {
    let total = new Map();

    total.set('cornice', 1);
    total.set('profile', 1);
    total.set('light', 1);

    $(".carousel input[name^=corn-]").click(function() {
        total.set('cornice', $(this).attr('name').split('-')[1]);
        $('.carousel input[name=corn-' + total.get('cornice') + ']').change(function() {
            let corn_first_price = $('.carousel input[name=one-' + total.get('cornice') + ']').val();
            let corn_price = corn_first_price * $(this).val();
            $('.carousel input[name=corn-out' + total.get('cornice') + ']').val(corn_price + ' BYN');
        })
    })

    $(".carousel input[name^=prof-]").click(function() {
        total.set('profile', $(this).attr('name').split('-')[1]);
        $('.carousel input[name=prof-' + total.get('profile') + ']').change(function() {
            let prof_first_price = $('.carousel input[name=two-' + total.get('profile') + ']').val();
            let prof_price = prof_first_price * $(this).val();
            $('.carousel input[name=prof-out' + total.get('profile') + ']').val(prof_price + ' BYN');
        })
    })

    $(".carousel input[name=three]").click(function() {
        let light = Math.ceil(parseFloat($(this).val()) + (Math.ceil($(this).val()) / 100 * 10));
        total.set('light', light);
        let total_sum = total.get('cornice') + total.get('profile') + total.get('light');
        $(".room form #total").val(total_sum + ' ' + 'BYN');
        $("#light-val").val(light + ' ' + 'BYN');
    })



});








