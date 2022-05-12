var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({

    title: String,
    description : String,
    collaborators : String,
    gender : Array,
    insert_date : Date, 
    project_dates : Object, // début => fin
    category : String,
    remuneration : Boolean,
    photos : Array,
    users_selected : Array,

    age_range : Object,
    collaborators_caracteristics : Object,
    localisation : String,
})


module.exports = mongoose.model('projects', projectSchema);