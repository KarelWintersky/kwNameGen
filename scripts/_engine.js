var engine = {
    settings : {},

    // constructor
    init : function(settings) {
        this.settings = settings;
    },

    // methods
    getRndElement : function(array) {
        let rnd = Math.floor( Math.random() * array.length );
        return array[ rnd ];
    },
    getNameParts : function(name) {
        return name.split(' | ');
    },
    getRndNameParts : function(array) {
        let rnd = Math.floor( Math.random() * array.length );
        return (array[rnd]).split('|');
    },

    getRndName : function( array ) {
        let rnd = Math.floor( Math.random() * array.length );
        let name = array[ rnd ];
    }


};