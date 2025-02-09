const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError=require("./utilities/ExpressError.js");
const {listingSchema ,reviewSchema}=require("./schema.js");
const review = require("./models/review");



module.exports.isLoggedIn=(req,res,next)=>{
    
     if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; 
        req.flash("error","You need to login first!");
        res.redirect("/login");
     }
     next();
}

module.exports.redirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }

    next();
}

module.exports.isOwner= async (req,res,next)=>{
    let {id} =req.params;
    let listing= await Listing.findById(id);
    
    if(!listing.owner.equals(res.locals.currUser._id)){
           req.flash("error","You are not the owner of the listing!");
           return res.redirect(`/listings/${id}`);
    }

    next();

}

module.exports.listingValidation=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
        // console.log(result);
        if(error){
        let errMsg=error.details.map(li=> li.message).join(",");
           throw new ExpressError(400,errMsg);
        }
        else{
            next();
        }
}

module.exports.reviewValidation=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
        // console.log(result);
        if(error){
        let errMsg=error.details.map(li=> li.message).join(",");
           throw new ExpressError(400,errMsg);
        }
        else{
            next();
        }
}

module.exports.isAuthor= async (req,res,next)=>{
    let {id,reviewId} =req.params;
    let review= await Review.findById(reviewId);
    
    if(!review.author.equals(res.locals.currUser._id)){
           req.flash("error","You are not the author of the review !");
           return res.redirect(`/listings/${id}`);
    }

    next();

}