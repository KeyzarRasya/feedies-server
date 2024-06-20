const Feedback = require('../model/Feedback');
const Business = require('../model/Business');
const Api = require('../model/Api');
const mongoose = require('mongoose')

const saveFeedback = async(connectionId, feedback, sender) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const findConnection = await Api.findOne({connectionId});
        if(!findConnection){
            throw new Error('your connection id seems doesnt valid');
        }
        const findUser = await Business.findById(findConnection.owner);
        if(!findUser){
            throw new Error('your account doesnt match the connectionID');
        }
        const newFeedback = new Feedback({
            sender,
            feedback
        })
        await newFeedback.save();
        findUser.feedback.push(newFeedback);
        await findUser.save();
        session.commitTransaction();
        session.endSession();
        return {status:200, message:'feedback saved'}
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        return {status:400, message:err.message}
    }
}

module.exports = {
    saveFeedback
}