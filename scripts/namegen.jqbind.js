$(document).ready(function () {
    // function must be declared inside $.ready()
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

        let $namegen_hint = $('#namegen-hint');
        if (engine_config.show_hints && exists( dictionary.config.hint )) {
            $namegen_hint.html( dictionary.config.hint ).show();
        } else {
            $namegen_hint.html('').hide();
        }
    };

    var dictionary;                 // current dictionary INSTANCE
    var current_country_iso_code;   // ISO code

    // generate Languages Optionslist
    languages = engine.sortAssocObject(languages, function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });
    Object.keys(languages).map(function(objKey, index) {
        // let str = '<option value="' + objKey + '">' + languages[objKey] + '</option>';
        $("#select-language").append( $('<option>', {
            value : objKey,
            text  : languages[objKey],
        }) );
    });

    // onLoad
    wlh.init();

    // set gender option to actual WLH.gender
    if (wlh.state.gender !== '') {
        $("#select-gender").val(wlh.state.gender).prop("selected", true);
    }

    // set dictionary option to actual WLH.dict
    if (wlh.state.dict !== '') {
        $("#select-language").val(wlh.state.dict).prop("selected", true);
        initDictionary(wlh.state);
    }

    // ============ BIND HANDLERS ============
    // SELECT LANGUAGE
    $("#select-language").on('change', function(){
        let dict = $(this).val();

        if (dict == "none") {
            // перешли на "выбери язык"
            wlh.state.dict = '';
        } else {
            wlh.state.dict = dict;
        }

        wlh.set_wlh();
        initDictionary(wlh.state);
    });

    // SELECT GENDER handler
    $("#select-gender").on('change', function(){
        wlh.state.gender = $(this).val();
        wlh.set_wlh();
    });

    // BUTTON 'generate name' onClick
    $("#actor-generate-name").on('click', function(){
        let name = dictionary.getRandomName( wlh.state.gender );
        let output = dictionary.printName( name );

        $("#namegen-result").html( '<span class="flag-before-single flag-' + current_country_iso_code + '">' + output + '</span><br>' );
        $("#namegen-history").prepend('<span class="flag flag-' + current_country_iso_code + '">' + output + '</span><br>');
    });

    // BUTTON 'reset' onClick
    $("#actor-result-reset").on('click', function(){
        wlh.reset_wlh();

        $("#namegen-result").html('&nbsp;');
        $("#namegen-history").html('');
        $("#select-language").val('none').trigger("change");
    });
});