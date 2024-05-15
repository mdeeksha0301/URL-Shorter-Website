const User = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../utils/auth');

async function handleUser(req, res) {
    const { name, email, password} = req.body;
    await User.create({
        name, 
        email,
        password,
    });
    return res.render("home");
}


async function handleUserLogin(req, res) {
    // console.log("working")
    const { email, password} = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (!user) return res.render('login', {
        error: "Invalid Username or Password",
    });

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}

module.exports = {
    handleUser,
    handleUserLogin
}