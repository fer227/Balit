const mongoose = require('mongoose');


const ParadaSchema = new mongoose.Schema(
{
        nombre : {
            type:String,
            trim:true,
            required:true
        },
        numero : {
            type:Number,
            required:true
        },
        latitud : {
            type:Number,
            required:true,
        },
        longitud : {
            type:Number,
            required:true,
        },
        conexiones : [{
            numeroParada: Number
        }]

}, {timestamps: true});


module.exports = mongoose.model('Parada', ParadaSchema);