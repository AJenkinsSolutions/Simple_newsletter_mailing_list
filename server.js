
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

// mailchimp.setConfig({
//     apiKey: API_KEY,
//     server: 'us17'
// });
//Mailchimp test 
// async function run() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
//   }
//   run();

//Create mailchimp list
const client = require("mailchimp-marketing");
const e = require('express');
const { error } = require('node:console');

client.setConfig({
    apiKey: API_KEY,
    server: 'us17'
});
const audID = 'd23ed0efc9'
const ENDPOINT = 'https://'+client.server+'.api.mailchimp.com/3.0/'

// // get specific list
// const run = async () => {
//     const response = await client.lists.getList(audID);
//     console.log(response.type);
//   };
  
// run();

// get all lists
// const run = async () => {
//     const response = await client.lists.getAllLists();
//     console.log(response);
    
    
//   };
//   run();

 






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

    //Add memeber to list
        //async expression
        const run = async () => {
           const response = await client.lists.addListMember(audID,{
              email_address: email,
              status: "subscribed",
              merge_fields: {
                FNAME: first_name,
                LNAME: last_name
            }
            });
            if(response.errors){
                throw new Error(response.errors.code);
            }
        };
        run().then((data) => {
            res.sendFile(__dirname + '/views/success.html');
        }).catch((err) => {
            res.sendFile(__dirname + '/views/fail.html')
        })
});