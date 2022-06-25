const mongoose = require('mongoose');


const PuntoDeInteresSchema = new mongoose.Schema(
{
        nombre : {
            type:String,
            trim:true,
            required:true
        },
        direccion : {
            type:String,
            trim:true,
            required:true
        },
        descripcion : {
            type:String,
            trim:true,
            required:true
        }
}, {timestamps: true});


module.exports = mongoose.model('PuntoDeInteres', PuntoDeInteresSchema);