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