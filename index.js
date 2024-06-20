require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {getEnvirovment} = require('./src/helper/envirovment')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const businessRouter = require('./src/routes/business');
const feedbackRouter = require('./src/routes/feedback')

const {PORT, BASE_URI, URI} = getEnvirovment(process.env.ENVIROVMENT);

mongoose.connect(URI)
.then(res => console.log("Connected to MongoDB"))
.catch(err => console.log(err))

const app = express();

app.use(session({
    secret:process.env.SESSION,
    resave:false,
    saveUninitialized:false
}))
app.use(cookieParser(process.env.COOKIE))

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/business", businessRouter);
app.use('/feedback', feedbackRouter);

app.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
})