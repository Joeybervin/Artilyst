var mongoose = require('mongoose');

var projects_selected = mongoose.Schema({
    idProject:{type: mongoose.Schema.Types.ObjectId, ref: 'projects' },
    match : Boolean,
});

var userSchema = mongoose.Schema({
    name : String,
    email :  String,
    password :  String,
    occupation : String,
    description: String,
    cv : String,
    profile_photo : Array,
    portfolio :  Array, // portofolios : Array => Object
    projects_selected :  [projects_selected] , // On=bjeect => id du projet + match en booleen
    projects_created : [ {type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
    insert_date: Date,
    date_of_birth :  Date,
    characteristics : Object,
    location : String,
    token : String,
    siren : Number, // 14 chiffre
})


module.exports = mongoose.model('users', userSchema);