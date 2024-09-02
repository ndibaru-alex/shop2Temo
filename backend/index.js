const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes/index')




const app= express();

const corsOptions = {
  origin: https://e-shop-tau-seven.vercel.app/,
  credentials: true, 
  optionSuccessStatus: 200,
  Headers: true,
  exposedHeaders: 'Set-Cookie',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization'
  ]
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin : process.env.FRONTEND_URL,
//     credentials : true
// }));

app.use(express.json({
verify: (req, buf) => {
req.rawBody = buf.toString()
},
limit: '50mb'
}));


app.use(cookieParser())


app.use('/api',router);




const PORT =  process.env.PORT || 8080;

connectDB().then( () =>{

app.listen(PORT ,() =>{
    
    console.log("Server is running")
})
})

