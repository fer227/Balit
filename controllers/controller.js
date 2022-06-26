// const HelloWorldSchema = require('../models/helloWorldSchema')
const ParadaSchema = require('../models/paradaSchema')
const LineaSchema = require('../models/lineaSchema')
const PuntoDeInteresSchema = require('../models/puntoDeInteresSchema')

class Controller{
    // Find in DB test
    // async helloWorldGet(ctx){
    //     await HelloWorldSchema.find({ key: 'Hello'}).exec().then((result) => {
    //         ctx.status = 200
    //         ctx.body = result
    //     }).catch((errorSave)=>{
    //         console.error(`Error getting object ${errorSave}`)
    //         ctx.status = 404
    //         ctx.body = result
    //     })
    // }

    // Create in DB test
    // async helloWorldPost(ctx){
    //     let newHelloWorld = new HelloWorldSchema({key:'Hello', value:'World'})
    //     await newHelloWorld.save().then((result) => {
    //         ctx.status = 201
    //         ctx.body = result
    //     }).catch((errorSave)=>{
    //         console.error(`Error saving object ${errorSave}`)
    //         ctx.status = 404
    //         ctx.body = result
    //     })
    // }

    async newLinea(ctx){
        let body = ctx.request.body
        let newLinea = new LineaSchema({nombre:body.nombre, numero:body.numero, latitud:body.latitud, longitud:body.longitud, conexiones:body.conexiones, puntosDeInteres:body.puntosDeInteres})
        await newLinea.save().then((result) => {
            ctx.status = 201
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error saving object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getLinea(ctx, id){
        await LineaSchema.find({nombre: id}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getLineas(ctx){
        await LineaSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async newPuntoDeInteres(ctx){
        let body = ctx.request.body
        let newPuntoDeInteres = new LineaSchema({nombre:body.nombre, direccion:body.direccion, descripcion:body.descripcion})
        await newPuntoDeInteres.save().then((result) => {
            ctx.status = 201
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error saving object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getPuntoDeInteres(ctx, id){
        await PuntoDeInteres.find({_id: id}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getPuntoDeInteres(ctx){
        await PuntoDeInteres.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async newParada(ctx){
        let body = ctx.request.body
        let newParada = new ParadaSchema({nombre:body.nombre, horaSalida:body.horaSalida, horaCierre:body.horaCierre, paradas:body.paradas})
        await newParada.save().then((result) => {
            ctx.status = 201
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error saving object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getParada(ctx, id){
        await ParadaSchema.find({numero: id}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getParadas(ctx){
        await ParadaSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getParadasByLinea(ctx, id){
        // First get Linea
        await LineaSchema.find({nombre: id}).exec().then((resultLinea) => {
            numeroParadas = []
            for(const parada of resultLinea.paradas){
                numeroParadas.push(parada.numeroParada)
            }

            // Get related paradas
            await ParadaSchema.find().where('numero').in(numeroParadas).exec().then((resultParada) => {
                response = {}
                response['orden'] = resultLinea.paradas
                response['infoParadas'] = resultParada
                ctx.status = 200
                ctx.body = response
            }).catch((errorSave)=>{
                console.error(`Error getting object. Error: ${errorSave}`)
                ctx.status = 404
                ctx.body = result
            })

        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    async getPuntosDeInteresByParada(ctx, id){
        // First get Parada
        await ParadaSchema.find({numero: id}).exec().then((resultParada) => {
            idPoIs = []
            for(const poi of resultParada.puntosDeInteres){
                idPoIs.push(poi.idPoI)
            }

            await PuntoDeInteresSchema.find().where('_id').in(idPoIs).exec().then((resultPOIS) => {
                ctx.status = 200
                ctx.body = resultPOIS
            }).catch((errorSave)=>{
                console.error(`Error getting object. Error: ${errorSave}`)
                ctx.status = 404
                ctx.body = result
            })

        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }
}

module.exports = Controller