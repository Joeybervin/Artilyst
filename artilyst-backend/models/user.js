var mongoose = require('mongoose');
//import { Schema, model } from 'mongoose';

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
    projects_selected :  [projects_selected] , // Object => id du projet + match en booleen
    projects_created : [ {type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
    insert_date: Date,
    date_of_birth :  Date,
    characteristics : {
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
    token : String,
    siren : Number, // 14 chiffre
})


module.exports = mongoose.model('users', userSchema);