$(function() {
    $(".modal-footer button").click(function() {
        let area = $("#S").val();
        let height = $("#K").val();
        let type_space = $("#type").val();
        let result  = (parseFloat(area) * parseInt(type_space) * parseFloat(height)) / 90;
        if (Number.isInteger(result)) {
           $(".modal-footer input").val(result.toString() + ' Вт');
        } else {
            $(".modal-footer input").val(Math.round(result) + ' Вт');
        }
    });

});


