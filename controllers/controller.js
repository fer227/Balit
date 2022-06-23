const HelloWorldSchema = require('../models/helloWorldSchema')

class Controller{
    // Find in DB test
    helloWorldGet(ctx){
        HelloWorldSchema.find({ title: 'Hello'}, function (err, docs) {
            if(err){
                console.log(err)
                ctx.status = 400
                ctx.body = {msg: err}
            }
            ctx.status = 200
            ctx.body = {msg: 'Data found', key: docs[0].key, value: docs[0].value}
        });
    }

    // Create in DB test
    helloWorldPost(){
        let newHelloWorld = new HelloWorldSchema({key:'Hello', value:'World'})
        await newHelloWorld.save().then(function (err, data){
            if(err){
                console.log(err)
                // ctx.status = 400
                // ctx.body = {msg: err}
                // return ctx
            }
            return {
                'status': 200,
                'data': data
            }
        })
    }
}

module.exports = Controller