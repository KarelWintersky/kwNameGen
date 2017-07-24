var ___ = {
    config : {
        translatable: 0
    },

    malename : [],
    femalename : [],
    lastname : [],


    getRandomName : function(gender){
        let rnd = 0;

        let result = '';
        let original = '';
        let transtalted = '';

        var name_source;

        // установим namearray сообразно гендеру
        if (gender == "male") {
            name_source = this.malename;
        }
        if (gender == "female") {
            name_source = this.femalename;
        }

        // генерируем имя
        result = engine.getRndNameParts( name_source );

        original    += result[0] + ' ';
        transtalted += result[1] + ' ';

        // генерируем фамилию
        result = engine.getRndNameParts( this.lastname );

        original    += result[0];
        transtalted += result[1];

        return {
            'original'  :   original,
            'translated':   transtalted
        };
    },
};