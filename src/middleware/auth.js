const isLoggedIn = (req, res, next) => {
    if(!req.signedCookies.acc){
        return res.send({status:400, message:'you are unauthenticated'});
    }
    next();
}

module.exports = {isLoggedIn};