const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.addReview=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    
    console.log("review was added");
    req.flash("success","New review was added!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success","review was deleted!");
    res.redirect(`/listings/${id}`);
}