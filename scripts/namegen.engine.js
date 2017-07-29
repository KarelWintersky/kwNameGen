/**
 * Конфигурационные (отладочные) переменные движка
 * @type {{show_hints: boolean}}
 */
var engine_config = {
    show_hints : true,
};

/**
 * Класс основного движка
 * @type {{getRndNameParts: Function, sortAssocObject: Function, }}
 */
var engine = {
    settings : {},

    // constructor
    init : function(settings) {
        this.settings = settings;
    },

    /**
     * =====================================  Engine methods =====================================
     */

    /**
     * Better random function
     * @returns {number}
     */
    rnd : function() {
        let today = new Date();
        let seed  = today.getTime();
        seed = (seed * 9301+49297) % 233280;
        return seed/(233280.0);
    },

    /**
     * Возвращает массив из 1 или 2 элементов, содержащий оригинал и перевод (индекс 0 и 1 соотв.) случайного элемента
     * из массива array. Перевод может отсутствовать для некоторых языков. Обработка такой ситуации на совести функции,
     * генерирующей имя для конкретного языка.
     *
     * @param array
     * @returns {Array : 0 => original, 1 => translated}
     */
    getRndNameParts : function(array) {
        let rnd = Math.floor( engine.rnd() * array.length );
        let name = array[rnd];
        return (name).split('|');
    },

    /**
     * Сортирует ассоциативный массив/объект с помощью функции-коллбэка.
     *
     * @param list
     * @param callable
     * @returns {{}}
     */
    sortAssocObject : function( list, callable ) {
        let sortable = [];
        for (let key in list) {
            sortable.push([key, list[key]]);
        }
        sortable.sort( callable );

        let orderedList = {};
        for (let i = 0; i < sortable.length; i++) {
            orderedList[sortable[i][0]] = sortable[i][1];
        }

        return orderedList;
    },

    /**
     * ===================================== Unused methods =====================================
     */

    /**
    * Возвращает случайный элемент массива array.
    *
    * @param array
    * @returns {*}
    */
    getRndElement : function(array) {
        let rnd = Math.floor( engine.rnd() * array.length );
        return array[ rnd ];
    },

    /**
     *
     * @param name
     * @returns {Array|*}
     */
    getNameParts : function(name) {
        return name.split(' | ');
    },
};



function exists(obj)
{
    return !(typeof obj === 'undefined' || obj === null);
}

function get_wlh_key( wlh_array, key )
{
    let result = null;
    wlh_array.forEach(function(element, index, array) {
        let pair = element.split('=');
        if (pair[0] == key) {
            result = pair[1];
        }
    });
    return result;
}

function wlh_get() // set start values based on window.location.hash
{
    let wlh = window.location.hash.substring(1);
    let splitted_wlh = wlh.split('&');
    let dict = get_wlh_key(splitted_wlh, 'dict') || '';
    let gender = get_wlh_key(splitted_wlh, 'gender') || 'male';

    return {
        dict    : dict,
        gender  : gender
    }
}

function wlh_set(state)
{
    let wlh_str = '';
    if (state.dict !== '') wlh_str += 'dict=' + state.dict + '&';
    wlh_str += 'gender=' + state.gender;
    window.location.hash = wlh_str;
}

function wlh_reset()
{
    return {
        dict    : '',
        gender  : 'male'
    }
}