const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const Contact = require("./routes/contact");

app.use('/api', Contact);

//connection from mongoose to mongodb
const connectToDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/mydataUser', {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log("Connect to mongodb");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

connectToDB();


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Connection is successful at ${port}`);
});