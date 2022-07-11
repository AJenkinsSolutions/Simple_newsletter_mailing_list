
require('dotenv').config()
// console.log(process.env)
const API_KEY = process.env.MAIL_CHIMP_API_KEY;

//Express framework
const express = require('express');
const app = express();
const port = 3000;

//https module 
const https = require('node:https');
var path = require('path')


//MailChimp API
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: API_KEY,
    server: 'us17'
});

//body parser
app.use(express.urlencoded({extended: true}));
app.use(express.static( __dirname, + 'public'));



app.listen(port, ()=>{
    console.log('Server is running on port: '+ port);
})




app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/', (req,res)=>{
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;

    res.write('<h1>Success !!</h1>');
    res.write('<h2>Thankyou for signing up </h2>');
    res.write('<h3>' +first_name + ' ' +last_name + ' '+ email + '</h3>')
    res.send();

})