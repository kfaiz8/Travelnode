const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:mapToken });

main()
.then(()=>console.log("connection successful"))
.catch(err=>console.log(err));

async function  main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/travelnode");
}


const initDB= async ()=>{
   await Listing.deleteMany({});
   
   initData.data=initData.data.map((obj)=>({...obj,owner:'6799efd867a7171f650cba16'}));
   await Listing.insertMany(initData.data);

   console.log("Database was initialized");
}

initDB();