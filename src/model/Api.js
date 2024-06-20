const mongoose = require('mongoose')

const apiSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.ObjectId,
        ref:'Business',
        require:true
    },
    key:{
        type:String,
        require:true
    },
    connectionId:{
        type:String,
        default:""
    }
})

const Model = mongoose.model('Api', apiSchema);

module.exports = Model;