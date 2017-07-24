var engine = {
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
    }
};