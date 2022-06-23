const HelloWorldSchema = require('../models/helloWorldSchema')

class Controller{
    // Find in DB test
    async helloWorldGet(ctx){
        await HelloWorldSchema.find({ key: 'Hello'}).exec().then((result) => {
            ctx.status = 200
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error getting object ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }

    // Create in DB test
    async helloWorldPost(ctx){
        let newHelloWorld = new HelloWorldSchema({key:'Hello', value:'World'})
        await newHelloWorld.save().then((result) => {
            ctx.status = 201
            ctx.body = result
        }).catch((errorSave)=>{
            console.error(`Error saving object ${errorSave}`)
            ctx.status = 404
            ctx.body = result
        })
    }
}

module.exports = Controller