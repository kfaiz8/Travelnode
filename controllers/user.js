const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async (req,res)=>{
    try{
        let {username,emailid,password}=req.body;

    const newUser= new  User({
        username:username,
        emailId:emailid,
        
    })

    let userData= await User.register(newUser,password);
    // console.log(userData);
    req.login(userData,err=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Travelnode!");
        res.redirect("/listings");
    })
   }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginPage=(req,res)=>{
    res.render("users/login.ejs"); }

module.exports.login=(req,res)=>{

    req.flash("success","Welcome Back!");
    let redirectUrl=res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }

        req.flash("success","you are logout successfuly!");
        res.redirect("/listings");
    })
}
