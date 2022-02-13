$(function() {
    let total = new Map();

    total.set('ceiling', 0);

    $(".carousel input[name^=clg-]").click(function() {
        total.set('ceiling', $(this).attr('name').split('-')[1]);
        $('.carousel input[name=clg-' + total.get('ceiling') + ']').change(function() {
            let clg_first_price = $('.carousel input[name=box-' + total.get('ceiling') + ']').val();
            let clg_price = clg_first_price * $(this).val();
            $('.carousel span[id=clg-out' + total.get('ceiling') + ']').text(clg_price + ' BYN');
        })
    })
});








