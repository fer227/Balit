// const HelloWorldSchema = require('../models/helloWorldSchema')
const ParadaSchema = require('../models/paradaSchema')
const LineaSchema = require('../models/lineaSchema')

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

    async getParadas(ctx, id){
        await ParadaSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }
}

module.exports = Controller