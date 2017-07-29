$(document).ready(function () {
    var dictionary;                 // current dictionary
    var current_country_iso_code;   // ISO code

    // generate Languages Optionslist
    languages = engine.sortAssocObject(languages, function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });
    Object.keys(languages).map(function(objKey, index) {
        $("#select-language").append( $('<option>', {
            value : objKey,
            text  : languages[objKey],
        }) );
    });

    // gender bind handler
    var gender = "male";
    $("#select-gender").on('change', function(){
        gender = $(this).val();
    });

    // bind languages selector
    $("#select-language").on('change', function(){
        let dict = $(this).val();
        let text = $(this).find('option:selected').text();
        let actor_generate_name__state = (dict == "null") ? true : false;

        $("#actor-generate-name").prop('disabled', actor_generate_name__state);

        dictionary = null;
        dictionary = eval(dict);

        // покажем хинт, установим код страны
        current_country_iso_code
            = exists( dictionary.config.iso_code)
            ? dictionary.config.iso_code
            : 'none';

        if (engine_config.show_hints && exists( dictionary.config.hint )) {
            $('#namegen-hint').html( dictionary.config.hint).show();
        } else {
            $('#namegen-hint').html('').hide();
        }
    });

    // bind 'generate name' onclick
    $("#actor-generate-name").on('click', function(){
        let name = dictionary.getRandomName( gender );
        let output = dictionary.printName( name );

        $("#namegen-result").html( '<span class="flag-before-single flag-' + current_country_iso_code + '">' + output + '</span><br>' );
        $("#namegen-history").prepend('<span class="flag flag-' + current_country_iso_code + '">' + output + '</span><br>');
    });

    // bind reset onclick
    $("#actor-result-reset").on('click', function(){
        $("#namegen-result").html('');
        $("#namegen-history").html('');

    });
});