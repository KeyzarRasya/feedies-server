const { signedCookie } = require('cookie-parser');
const {addUser, findValidate, getApiKey, createApiConnection, disconnectApiConnection} = require('../service/business')
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');

const signup = async (req, res) => {
    const {businessName, email, password} = req.body;
    const business = await addUser({businessName, email, password});
    res.send(business);
}

const login = async(req,res) => {
    const {email, password} = req.body;
    const business = await findValidate(email, password);
    if(business.status === 200){
        const token = await jwt.sign({business:business}, process.env.JWT, {expiresIn:'1h'});
        res.cookie('acc', token, {signed:true})
    }
    res.send(business);
}

const genearetApi = async(req, res) => {
    const decode = jwtDecode(req.signedCookies.acc);
    const response = await getApiKey(decode.business.account._id);
    res.send(response);
}


const createConnection = async(req, res) => {
    const {apiKey} = req.body;
    const connection = await createApiConnection(apiKey);
    res.send(connection);
}

const disconnectConnection = async(req, res) => {
    const {connectionId} = req.body;
    const disconnect = await disconnectApiConnection(connectionId);
    res.send(disconnect);
}

module.exports = {
    signup,
    login,
    genearetApi,
    createConnection,
    disconnectConnection
}