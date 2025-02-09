if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

 

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utilities/wrapAsync.js");
const ExpressError=require("./utilities/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const userRoute=require("./routes/user.js");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const dbUrl= process.env.ATLAS_URL;

main()
.then( () => console.log("Connection Successful"))
.catch(err => console.log("err"));

async function main() {
    
    await mongoose.connect(dbUrl);
       
    
}

app.listen(8080,'0.0.0.0',()=>{
    console.log("listening on port 8080");
});


app.set("view engine","ejs");
app.set( "views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error",()=>{
   console.log("error in mongo session store:" ,err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
     expires: Date.now() + 1000*60*60*24*7,
     maxAge: 1000*60*60*24*7,
     httpOnly: true
    }
};
 
 app.use(flash());
 app.use(session(sessionOptions));
 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(User.authenticate()));

 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

 app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

//listing routes
app.use("/listings",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",userRoute);




// app.get("/listings", async (req,res)=>{
//     let newListing=new Listing({
//         title:"My Villa",
//         description:"buy villa",
//         price:2300000,
//         location:"Coimbatore Kerela" ,
//         country:"India"
//     });
//    await newListing.save();

//    res.send("Success");

// })






//for review submission







app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="somethimg went wrong"}=err;
    
    res.status(status).render("error.ejs",{message});

})

