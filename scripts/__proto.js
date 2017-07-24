var ___ = {
    config : {
        translatable: 0
    },

    name_m : [],
    name_f : [],
    cognomen : [],


    getRandomName : function(gender){
        let rnd = 0;

        let result = '';
        let original = '';
        let transtalted = '';

        var name_source;

        // установим namearray сообразно гендеру
        if (gender == "male") {
            name_source = this.name_m;
        }
        if (gender == "female") {
            name_source = this.name_f;
        }

        // генерируем имя
        result = engine.getRndNameParts( name_source );

        original    += result[0] + ' ';
        transtalted += result[1] + ' ';

        // генерируем фамилию
        result = engine.getRndNameParts( this.cognomen );

        original    += result[0];
        transtalted += result[1];

        return {
            'original'  :   original,
            'translated':   transtalted
        };
    },
    printName: function(string) {
        return out = string.original;
    }
};