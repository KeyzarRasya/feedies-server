const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    sender:{
        type:String,
        require:true
    },
    feedback:{
        type:String,
        require:true
    },
    publishedAt:{
        type:Date,
        default:Date.now()
    }
})

const Model = mongoose.model('Feedback', feedbackSchema);

module.exports = Model;