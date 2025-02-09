const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utilities/wrapAsync.js");
const {isLoggedIn,isOwner,listingValidation}=require("../middleware.js");
const listingController= require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

router.route("/")
.get(wrapAsync(
    listingController.index
))
.post(isLoggedIn,upload.single("listing[image]"),listingValidation,wrapAsync(
    listingController.addListing
))




router.get("/new",isLoggedIn,
    listingController.newListing
)

router.route("/:id")
.get(wrapAsync(
    listingController.showListing
))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),listingValidation,wrapAsync(
    listingController.editListing
)) 
.delete(isLoggedIn,isOwner,wrapAsync(
    listingController.destroyRoute
))

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(
    listingController.editForm
))

module.exports= router;
