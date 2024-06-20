function getEnvirovment(env){
    let URI = "";
    let PORT = "";
    let BASE_URI = "";
    if(env === "dev"){
        URI = process.env.MONGO_DEV;
    }else {
        URI = process.env.MONGO_PROD;
    }
    PORT = process.env.PORT || 3001;
    BASE_URI = `${BASE_URI}${PORT}`
    return {URI, PORT, BASE_URI};
}

module.exports = {getEnvirovment}