$(document).ready(function () {
    var wlh_state = {
        dict : '',
        gender : ''
    };
    wlh_state = wlh_get();

    var dictionary;                 // current dictionary INSTANCE
    var current_country_iso_code;   // ISO code

    // generate Languages Optionslist
    languages = engine.sortAssocObject(languages, function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });
    Object.keys(languages).map(function(objKey, index) {
        $("#select-language").append( $('<option>', {
            value : objKey,
            text  : languages[objKey],
        }) );
    });

    // set language option to actual WLH.dict
    if (wlh_state.dict !== '') {
        $("#select-language").val(wlh_state.dict).trigger("change");
        dictionary = null;
        dictionary = eval(wlh_state.dict);
    }

    // set gender option to actual WLH.gender
    if (wlh_state.gender !== '') {
        $("#select-gender").val(wlh_state.gender).trigger("change"); //@todo: а в чем различие с ".prop('selected', true)" ? (триггер вызывает еще и событие)
    }

    // ============ BIND HANDLERS ============

    // SELECT GENDER handler
    $("#select-gender").on('change', function(){
        wlh_state.gender = $(this).val();
        wlh_set(wlh_state);
    });

    // SELECT LANGUAGE
    $("#select-language").on('change', function(){
        let state_generate_name_actor;
        let dict = $(this).val();
        let text = $(this).find('option:selected').text();

        if (dict == "none") {
            state_generate_name_actor = true;
            wlh_state.dict = '';
        } else {
            state_generate_name_actor = false;
            wlh_state.dict = dict;
        }
        $("#actor-generate-name").prop('disabled', state_generate_name_actor);

        dictionary = null;

        if (dict == 'none') return false; // prevent set unexistent dictionary

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
        $("#namegen-result").html('&nbsp;');
        $("#namegen-history").html('');
        wlh_state = wlh_reset();
        $("#select-language").val('none').trigger("change");
        history.pushState("", document.title, window.location.pathname + window.location.search); // clear hash
    });
});