// const HelloWorldSchema = require('../models/helloWorldSchema')
const ParadaSchema = require('../models/paradaSchema')
const LineaSchema = require('../models/lineaSchema')
const PuntoDeInteresSchema = require('../models/puntoDeInteresSchema')
const puntoDeInteresSchema = require('../models/puntoDeInteresSchema')
const mongoose = require('mongoose');

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
            ctx.status = 400
            ctx.body = errorSave
        })
    }

    async getLinea(ctx, id){
        await LineaSchema.findOne({nombre: id}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getLineas(ctx){
        await LineaSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async newPuntoDeInteres(ctx){
        let body = ctx.request.body
        let newPuntoDeInteres = new puntoDeInteresSchema({nombre:body.nombre, direccion:body.direccion, descripcion:body.descripcion})
        await newPuntoDeInteres.save().then((result) => {
            ctx.status = 201
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error saving object. Error: ${errorSave}`)
            ctx.status = 400
            ctx.body = errorSave
        })
    }

    async getPuntoDeInteres(ctx, id){
        await puntoDeInteresSchema.findOne({_id: id}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getPuntosDeInteres(ctx){
        await puntoDeInteresSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async newLinea(ctx){
        let body = ctx.request.body
        let newLinea = new LineaSchema({nombre:body.nombre, horaSalida:body.horaSalida, horaCierre:body.horaCierre, paradas:body.paradas})
        await newLinea.save().then((result) => {
            ctx.status = 201
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error saving object. Error: ${errorSave}`)
            ctx.status = 400
            ctx.body = errorSave
        })
    }

    async getParada(ctx, id){
        await ParadaSchema.findOne({numero: id}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getParadas(ctx){
        await ParadaSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getPuntosDeInteres(ctx){
        await PuntoDeInteresSchema.find({}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getParadasByLinea(ctx, id){
        // First get Linea
        let numeroParadas = []
        let orden
        await LineaSchema.findOne({nombre: id}).exec().then(async (resultLinea) => {
            resultLinea.paradas.forEach(function(parada){
                numeroParadas.push(parada.numeroParada)
            })
            orden = resultLinea.paradas
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })

        // Get related paradas
        await ParadaSchema.find().where('numero').in(numeroParadas).exec().then((resultParada) => {
            let response = {}
            response['orden'] = orden
            response['infoParadas'] = resultParada
            ctx.status = 200
            ctx.body = response
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getPuntosDeInteresByLinea(ctx, ids){
        // First get Parada
        let idPoIs = []
        await ParadaSchema.find().where('numero').in(ids).exec().then(async (resultParadas) => {
            resultParadas.forEach(function(parada){
                parada.puntosDeInteres.forEach(function(poi){
                    idPoIs.push(poi._id.toString())
                })
            })
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })

        // Get related POIs
        await PuntoDeInteresSchema.find().where('_id').in(idPoIs).exec().then((resultPOIS) => {
            ctx.status = 200
            ctx.body = resultPOIS
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async getPuntosDeInteresByParada(ctx, id){
        // First get Parada
        let idPoIs = []
        await ParadaSchema.findOne({numero: id}).exec().then(async (resultParada) => {
            resultParada.puntosDeInteres.forEach(function(poi){
                idPoIs.push(poi._id.toString())
            })
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })

        // Get related POIs
        await PuntoDeInteresSchema.find().where('_id').in(idPoIs).exec().then((resultPOIS) => {
            ctx.status = 200
            ctx.body = resultPOIS
        }).catch((errorSave)=>{
            console.error(`Error getting object. Error: ${errorSave}`)
            ctx.status = 404
            ctx.body = errorSave
        })
    }

    async initializeDB(ctx){
        // pois
        let poiJuventud = new PuntoDeInteresSchema({nombre:'Estadio de la Juventud', direccion: 'C. Albondón 2, Granada', descripcion:'Recinto para eventos y todo tipo de deportes.', tags: ['Deporte', 'Ocio']})
        let poiCatedral = new PuntoDeInteresSchema({nombre:'Catedral', direccion: 'C. Gran Vía de Colón, 5, Granada', descripcion:'Iglesia del s. XVI situada en el centro urbano. La Catedral de Granada combina los estilos gótico, renacentista y barroco. Junto a la catedral se encuentra la Capilla Real, la capilla funerariade los reyes.', tags: ['Cultura', 'Arquitectura']})
        let poiPaseo = new PuntoDeInteresSchema({nombre:'Paseo de los Tristes', direccion: 'C. Gran Vía de Colón, 5, Granada', descripcion:'Pequeña ruta con vistas a la Alhambra.', tags: ['Paisaje', 'Gastronomía']})
        let poiCiencias = new PuntoDeInteresSchema({nombre:'Parque de las Ciencias', direccion: 'Av. de la Ciencia', descripcion:'Museo interactivo de ciencia.', tags: ['Cultura', 'Ocio', 'Educación']})
        let poiEstacion = new PuntoDeInteresSchema({nombre:'Estación de autobuses', direccion: 'Av. Juan Pablo II ', descripcion:'Estación principal de autobuses de la ciudad de Granada.', tags: ['Servicios', 'Transporte']})

        const pois = [poiJuventud, poiCatedral, poiPaseo, poiCiencias, poiEstacion]
        let poiIdByName = {}

        for (const poi of pois){
            await poi.save().then((result) => {
                poiIdByName[poi.nombre] = result._id.toString()
            }).catch((errorSave)=>{
                console.error(`Error saving object. Error: ${errorSave}`)
                ctx.status = 400
                ctx.body = errorSave
            })
        }

        // paradas
        let p1 = new ParadaSchema({nombre: 'Estadio de la Juventud', numero: 100, latitud: 37.1841645, longitud: -3.6191081, conexiones: [{nombreLinea: 'N3', descripcion: 'Cerrillo de Maracena- Triunfo'}, {nombreLinea: '5', descripcion: 'Beethoven- Parque Nueva Granada'}], puntosDeInteres: [poiIdByName['Estadio de la Juventud']]})
        let p2 = new ParadaSchema({nombre: 'Catedral', numero: 200, latitud: 37.1765906, longitud: -3.6012536, conexiones: [{nombreLinea: 'C4', descripcion: 'Chana- Zaidín'}, {nombreLinea: '5', descripcion: 'Beethoven- Parque Nueva Granada'}], puntosDeInteres: [poiIdByName['Catedral']]})
        let p3 = new ParadaSchema({nombre: 'Paseo de los Tristes', numero: 300, latitud: 37.1791997, longitud: -3.59096, conexiones: [{nombreLinea: 'N3', descripcion: 'Cerrillo de Maracena- Triunfo'}, {nombreLinea: '5', descripcion: 'Beethoven- Parque Nueva Granada'}], puntosDeInteres: [poiIdByName['Paseo de los Tristes']]})
        let p4 = new ParadaSchema({nombre: 'Parque de las Ciencias', numero: 400, latitud: 37.1628818, longitud: -3.6079535, conexiones: [{nombreLinea: 'N3', descripcion: 'Cerrillo de Maracena- Triunfo'}, {nombreLinea: 'C4', descripcion: 'Chana- Zaidín'}], puntosDeInteres: [poiIdByName['Parque de las Ciencias']]})
        let p5 = new ParadaSchema({nombre: 'Estación de autobuses', numero: 500, latitud: 37.1999839, longitud: -3.6153844, conexiones: [{nombreLinea: 'N3', descripcion: 'Cerrillo de Maracena- Triunfo'}, {nombreLinea: 'C4', descripcion: 'Chana- Zaidín'}], puntosDeInteres: [poiIdByName['Estación de autobuses'], poiIdByName['Catedral']]})
    
        const paradas = [p1,p2,p3,p4,p5]
        for (const parada of paradas){
            await parada.save().then((result) => {
            }).catch((errorSave)=>{
                console.error(`Error saving object. Error: ${errorSave}`)
                ctx.status = 400
                ctx.body = errorSave
            })
        }

        // líneas
        let n3 = new LineaSchema({nombre: 'N3', descripcion: 'Cerrillo de Maracena- Triunfo',  horaSalida: 8, horaCierre: 23, paradas: [{numeroParada: 100, orden: 1}, {numeroParada: 300, orden: 2}, {numeroParada: 400, orden: 3}, {numeroParada: 500, orden: 4}]})
        let c4 = new LineaSchema({nombre: 'C4', descripcion: 'Chana- Zaidín', horaSalida: 8, horaCierre: 23, paradas: [{numeroParada: 200, orden: 1}, {numeroParada: 400, orden: 2}, {numeroParada: 500, orden: 3}]})
        let x5 = new LineaSchema({nombre: '5', descripcion: 'Beethoven- Parque Nueva Granada', horaSalida: 8, horaCierre: 23, paradas: [{numeroParada: 100, orden: 1}, {numeroParada: 200, orden: 2}, {numeroParada: 300, orden: 3}]})

        const lineas = [n3, c4, x5]
        lineas.forEach(async function(linea){
            await linea.save().then((result) => {
            }).catch((errorSave)=>{
                console.error(`Error saving object. Error: ${errorSave}`)
                ctx.status = 400
                ctx.body = errorSave
            })
        })

        ctx.status = 201
    }
}

module.exports = Controller