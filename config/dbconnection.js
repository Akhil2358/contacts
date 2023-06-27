const  mongoose  = require("mongoose");

const connectDb = async()=>{
    try{
        const mongoUrl = 'mongodb://' + process.env.HOST + '/' + process.env.DATABASE;
        // console.log(mongoUrl, '====================')
        const connect = await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected: " ,
        connect.connection.host,
        connect.connection.name
        );

    }catch(err){
        console.log(err);
        process.exit(1);
    }

};

module.exports = connectDb;