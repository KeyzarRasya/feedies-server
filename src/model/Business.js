const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    businessName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    feedback:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Feedback',
            default:[]
        }
    ],
    apiKey:{
        type:String,
        default:""
    }
})

const Model = mongoose.model('Business', businessSchema);

module.exports = Model;