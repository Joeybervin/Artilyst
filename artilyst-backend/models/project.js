var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({

    title: String,
    owner : String, // token : de l'utilisateur qui la créé
    description : String,
    collaborators : String,
    insert_date : Date, 
    project_dates : { 
        start_date : Date,
        end_date : Date,
    }, 
    category : String,
    remuneration : Boolean,
    photos : Array,
    users_selected : Array,
    location : String,
    collaborators_characteristics : {
        age_min: Number,
        age_max: Number,
        gender: Array, 
        ethnicGroup: Array,
        hair: Array, 
        eyes: Array,
        height: {
            min : Number,
            max : Number,
        }, 
        weight: {
            min : Number,
            max : Number,
        }, 
        corpulence: {
            min : Number,
            max : Number,
        },
        measurements: { 
            waist: {
                min : Number,
                max : Number,
            }, 
            bust: {
                min : Number,
                max : Number,
            }, 
            hips: {
                min : Number,
                max : Number,
            } },
        },
        test : Boolean,
})


module.exports = mongoose.model('projects', projectSchema);