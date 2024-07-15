require('dotenv').config();
// global variables
const PORT = process.env.PORT || 8080;

// importing required packages 
const express = require('express');
const app = express();

const cors = require("cors");
// setting express server and middlewares

app.use(express.json({ limit: '50mb' }));
app.use(cors());

// importing and calling connectDB function
const connectDB = require('./controllers/functions/connectDB.js');
connectDB();

// importing required controller files for shops
const getShop = require('./controllers/shop/getShop.js');
const addShop = require('./controllers/shop/addShop.js');
const updateShop = require('./controllers/shop/updateShop.js');
const deleteShop = require('./controllers/shop/deleteShop.js');
const nearByShops = require('./controllers/shop/nearByShops.js');
const addLogo = require('./controllers/shop/addLogo.js');
const getLogo = require('./controllers/shop/getLogo.js');

// importing required controller files for appointments
const getAppointmentTimings = require('./controllers/appointments/getAppointmentTimings.js');
const setAppointment = require('./controllers/appointments/setAppointment.js');
const getAppointmentData = require('./controllers/appointments/getAppointmentData.js');
const updateAppointment = require('./controllers/appointments/updateAppointment.js');

// importing required controller files for users
const signup = require('./controllers/user/signup.js');
const login = require('./controllers/user/login.js');
const update = require('./controllers/user/update.js');
const deleteUser = require('./controllers/user/delete.js');
const addImage = require('./controllers/user/addImage.js');
const getImage = require('./controllers/user/getImage.js');
const sendOtp = require('./controllers/user/sendOtp.js');
const getUserInfo = require('./controllers/user/getUserInfo.js');
const loginShop = require('./controllers/shop/loginShop.js')

// setting routes for shops
app.post('/getShop', getShop);
app.post('/addShop',addShop);
app.post('/updateShop',updateShop);
app.post('/deleteShop',deleteShop);
app.post('/nearByShops',nearByShops);
app.post('/getLogo',getLogo);
app.post('/addLogo',addLogo);
app.post('/loginShop', loginShop)

// setting routes for appointments
app.post('/getAppointmentTimings',getAppointmentTimings);
app.post('/setAppointment',setAppointment);
app.post('/getAppointmentData',getAppointmentData);
app.post('/updateAppointment',updateAppointment);


// setting routes for users
app.post('/signup',signup);
app.post('/login',login);
app.post('/update',update);
app.post('/delete',deleteUser);
app.post('/getImage',getImage);
app.post('/addImage',addImage);
app.post('/sendOtp',sendOtp);
app.post('/getUserInfo',getUserInfo);

// test route
app.get('/',(req,res)=>{
res.send('The server is running :)')
})
// listening to the server
app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server live on localhost:${PORT}`) );
