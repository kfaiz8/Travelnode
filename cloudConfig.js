
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET

});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'travelnode_DEV',
      allowedFormats:["png","jpg","jpeg"] ,
    } 
      
  });

  cloudinary.api.ping()
  .then(res => console.log("Cloudinary connected:", res))
  .catch(err => console.error("Cloudinary connection error:", err));


module.exports={
    cloudinary,
    storage
}