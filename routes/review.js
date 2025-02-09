const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utilities/wrapAsync.js");
const reviewController=require("../controllers/review.js")

const {reviewValidation,isLoggedIn,isAuthor}=require("../middleware.js");



router.post("/",isLoggedIn,reviewValidation,wrapAsync(
    reviewController.addReview
))

router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(
    reviewController.destroyReview
))

module.exports=router;