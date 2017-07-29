$(document).ready(function () {

    var initDictionary = function(state) {
        $("#actor-generate-name").prop('disabled', !!(state.dict == ''));
        if (state.dict == '') {
            return false;
        }
        dictionary = null;
        dictionary = eval(state.dict);
        current_country_iso_code
            = exists( dictionary.config.iso_code)
            ? dictionary.config.iso_code
            : 'none';
        if (engine_config.show_hints && exists( dictionary.config.hint )) {
            $('#namegen-hint').html( dictionary.config.hint).show();
        } else {
            $('#namegen-hint').html('').hide();
        }
    };

    var wlh_state = {
        dict : '',
        gender : ''
    };
    var dictionary;                 // current dictionary INSTANCE
    var current_country_iso_code;   // ISO code

    // generate Languages Optionslist
    languages = engine.sortAssocObject(languages, function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });
    Object.keys(languages).map(function(objKey, index) {
        // let str = '<option value="' + objKey + '">' + languages[objKey] + '</option>';
        // console.log(str);
        $("#select-language").append( $('<option>', {
            value : objKey,
            text  : languages[objKey],
        }) );
    });

    // onLoad
    wlh_state = wlh_get();

    // set gender option to actual WLH.gender
    if (wlh_state.gender !== '') {
        $("#select-gender").val(wlh_state.gender).prop("selected", true);
    }

    // set dictionary option to actual WLH.dict
    if (wlh_state.dict !== '') {
        $("#select-language").val(wlh_state.dict).prop("selected", true);
        initDictionary(wlh_state);
    }

    // ============ BIND HANDLERS ============
    // SELECT LANGUAGE
    $("#select-language").on('change', function(){
        let dict = $(this).val();

        if (dict == "none") {
            // перешли на "выбери язык"
            wlh_state.dict = '';
        } else {
            wlh_state.dict = dict;
        }

        wlh_set(wlh_state);
        initDictionary(wlh_state);
    });

    // SELECT GENDER handler
    $("#select-gender").on('change', function(){
        wlh_state.gender = $(this).val();
        wlh_set(wlh_state);
    });



    // BUTTON 'generate name' onClick
    $("#actor-generate-name").on('click', function(){
        let name = dictionary.getRandomName( wlh_state.gender );
        let output = dictionary.printName( name );

        $("#namegen-result").html( '<span class="flag-before-single flag-' + current_country_iso_code + '">' + output + '</span><br>' );
        $("#namegen-history").prepend('<span class="flag flag-' + current_country_iso_code + '">' + output + '</span><br>');
    });

    // BUTTON 'reset' onClick
    $("#actor-result-reset").on('click', function(){
        wlh_state = wlh_reset();

        $("#namegen-result").html('&nbsp;');
        $("#namegen-history").html('');
        $("#select-language").val('none').trigger("change");
    });
});