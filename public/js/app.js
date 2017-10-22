function postCityName() {
    var cityName = $('#input-city');

    if (cityName.val().length > 0) {
        $.post('http://localhost:5000/?city=' + cityName.val(), function (data) {            
            $('body').html(data);
        });
    }
}