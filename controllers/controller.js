// const HelloWorldSchema = require('../models/helloWorldSchema')
const ParadaSchema = require('../models/paradaSchema')

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

    
    async newParada(ctx){
        let body = ctx.request.body
        let newParada = new ParadaSchema({nombre:body.nombre, numero:body.numero, latitud:body.latitud, longitud:body.longitud, conexiones:body.conexiones, puntosDeInteres:body.puntosDeInteres})
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
        await ParadaSchema.find({ numero: id}).exec().then((result) => {
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