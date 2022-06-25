const mongoose = require('mongoose');


const LineaSchema = new mongoose.Schema(
{
        nombre : {
            type:String,
            trim:true,
            required:true,
            unique:true
        },
        horaSalida : {
            type:Number,
            required:true,
            min: 0,
            max: 23
        },
        horaCierre : {
            type:Number,
            required:true,
            min: 0,
            max: 23
        },
        paradas : [{
            nombreLinea: String,
            orden: Number
        }]

}, {timestamps: true});


module.exports = mongoose.model('Linea', LineaSchema);