var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name : String,
    email :  String,
    password :  String,
    gender :  String,
    occupation : String,
    description: String,
    cv : String,
    profile_photo : Array,
    portfolio :  Array, // portofolios : Array => Object
    projects_selected :  Array , // On=bjeect => id du projet + match en booleen
    projects_created : [ {type: mongoose.Schema.Types.ObjectId, ref: 'projects' }],
    insert_date: Date,

    date_of_birth :  Date,
    characteristics : Object,
    /*  {
        gender: String, 
        ethnicGroup: String,
        hair: String, 
        eyes: String, 
        height: Number, 
        weight: Number, 
        corpulence: String,
        measurements: { 
            waistSize: Number, 
            bustSize: Number, 
            hipMeasurement: Number }
    }, */
    city : String,


    token : String,
    siren : Number, // 14 chiffre
})


module.exports = mongoose.model('users', userSchema);