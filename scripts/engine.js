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

function sortAssocObject(list , callable) {
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
}