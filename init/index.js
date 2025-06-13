const mongoose = require('mongoose');
const initdata = require('./data.js'); 
const Listing = require('../models/listing.js')
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("err : ",err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/tripzy");
};
const initDB = async ()=>{
    // await Listing.deleteMany({});
    let data = initdata.data; 
    await Listing.insertMany(data);
    console.log("data was initialised");
};
initDB();
