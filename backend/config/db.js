const mongoose= require('mongoose')

const connectDB=async()=>{
    try{
        mongoose.set("strictQuery", false);

        const conn= await mongoose.connect(process.env.MONGO_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log(`MongoDb connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`MongoDb error: ${error.message}`)
        process.exit(1)
    }
};

module.exports= connectDB;
