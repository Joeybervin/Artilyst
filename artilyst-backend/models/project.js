var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({

    title: String,
    owner : String, // token : de l'utilisateur qui la créé
    description : String,
    collaborators : String,
    gender : String,
    insert_date : Date, 
    project_dates : Object, // début => fin
    category : String,
    remuneration : Boolean,
    photos : Array,
    users_selected : Array,
    age_min: Number,
    age_max: Number,
    collaborators_characteristics : {
        gender: String, 
        ethnicGroup: String,
        hair: String, 
        eyes: String, 
        height: Number, 
        weight: Number, 
        corpulence: String,
        measurements: { 
            waist: Number, 
            bust: Number, 
            hips: Number },
        },
    location : String,
})


module.exports = mongoose.model('projects', projectSchema);