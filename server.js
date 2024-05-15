const express = require('express');
const connectDB = require('./connection');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const urlRoute = require('./routes/index');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const {restrictedToLoginedUsersOnly, checkAuth} = require('./middlewares/auth')
const app = express();
const PORT = process.env.PORT;

connectDB(process.env.MONGOURL).then(()=> {
    console.log("DB connected successfully")
}).catch(()=>{
    console.error("Error connecting DB:", error);
})

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url", restrictedToLoginedUsersOnly, urlRoute);
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute)


app.listen(PORT, () => console.log(`Server is running on: ${PORT}` ));