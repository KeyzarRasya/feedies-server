const { generateString } = require('../helper/generator');
const mongoose = require('mongoose');
const {v4:uuid} = require('uuid')
const Business = require('../model/Business');
const Api = require('../model/Api');
const bcrypt = require('bcrypt')

const addUser = async(metadata) => {
    const checkEmail = await Business.findOne({email:metadata.email});
    if(checkEmail){
        return {status:400, message:'email already existed'}
    }
    const encrypt = await bcrypt.hash(metadata.password, 12);
    const newBusiness = new Business({
        businessName:metadata.businessName,
        email:metadata.email,
        password:encrypt
    })
    await newBusiness.save();
    return {status:200, account:newBusiness};
}

const findValidate = async(email, password) => {
    const findAccount = await Business.findOne({email:email});
    if(!findAccount){
        return {status:400, message:'email not found'}
    }
    const isvalid = await bcrypt.compare(password, findAccount.password);
    if(!isvalid){
        return {status:400, message:'password not valid'};
    }
    return {status:200, account:findAccount};
}

const getApiKey = async(identifier) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const validateBusiness = await Business.findById(identifier);
        if(!validateBusiness){
            throw new Error('account not found');
        }
        const validateRequest = await Api.findOne({owner:identifier});
        if(validateRequest){
            await Api.deleteOne({_id:validateRequest._id});
        }
        const apiKey = generateString(identifier);
        const newApi = new Api({
            owner:identifier,
            key:apiKey
        })
        await newApi.save();
        session.commitTransaction();
        session.endSession()
        return {status:200, apiKey:apiKey};
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        return {status:400, message:err.message};
    }
}

const createApiConnection = async(apiKey) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const findApi = await Api.findOne({key:apiKey});
        if(!findApi){
            throw new Error('Api Key not found');
        }
        findApi.connectionId = uuid();
        await findApi.save();
        session.commitTransaction();
        session.endSession();
        return {status:200, connectionId:findApi.connectionId};
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        return {status:400, message:err.message};
    }

}

const disconnectApiConnection= async(connectionId) => {
    const findConnId = await Api.findOne({connectionId:connectionId});
    if(!findConnId){
        return{status:400, message:'cannot find connection id'};
    }
    findConnId.connectionId = "";
    await findConnId.save();
    return {status:200, message:'the connection is sucessfully disconnected'};
}

const setConId = (apiKey, connectionId) => {

}

module.exports = {
    addUser,
    findValidate,
    getApiKey,
    setConId,
    createApiConnection,
    disconnectApiConnection
}