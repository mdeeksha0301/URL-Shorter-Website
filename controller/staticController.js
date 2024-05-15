const UrlId = require('../model/index');

async function handleHome(req, res) {
    if(!req.user) return res.redirect('/login');
    const allUrls = await UrlId.find({createdBy: req.user._id});
    return res.render("home", {
        urls: allUrls,
    });
}

async function handleSignup(req, res){
    return res.render("signup")
}

async function handlelogin(req, res){
    return res.render("login")
}

module.exports = {
    handleHome,
    handleSignup,
    handlelogin,
}