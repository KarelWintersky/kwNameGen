var wlh = {
    default_state : {
        dict    : '',
        gender  : 'male'
    },
    state : {
    },

    get_key: function(wlh_array, key) {
        let result = null;
        wlh_array.forEach(function(element, index, array) {
            let pair = element.split('=');
            if (pair[0] == key) {
                result = pair[1];
            }
        });
        return result;
    },

    init: function() {
        let wlh = window.location.hash.substring(1);
        let splitted_wlh = wlh.split('&');
        let dict = this.get_key(splitted_wlh, 'dict') || '';
        let gender = this.get_key(splitted_wlh, 'gender') || 'male';

        this.state = {
            dict    : dict,
            gender  : gender
        }
    },

    set_wlh: function(){
        let wlh_str = '';
        if (this.state.dict !== '') {
            wlh_str += 'dict=' + this.state.dict + '&';
            wlh_str += 'gender=' + this.state.gender;
            window.location.hash = wlh_str;
        } else {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    },

    reset_wlh: function(){
        history.pushState("", document.title, window.location.pathname + window.location.search); // clear hash
        this.state = this.default_state;
        return this.default_state;
    }

};

