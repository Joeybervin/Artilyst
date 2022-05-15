var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name : String,
    email :  String,
    password :  String,
    gender :  String,
    occupation : String,
    description: String,
    expérience : String,
    photos :  Object, // photos_profil : Array, portofolios : Array => Object
    projects_selected :  Array , // On=bjeect => id du projet + match en booleen
    projects_created : [ {type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
    insert_date: Date,

    date_of_birth :  Date,
    user_caracteristics : Object,
    location : String,


    token : String,
    siren : Number, // 14 chiffre
})


module.exports = mongoose.model('users', userSchema);