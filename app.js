const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { send } = require('process');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});

app.post('/failure',function(req,res){
    res.redirect('/');
});

app.post('/',function(req,res){

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
           { 

               email_address: email,
               status:'subscribed',
               merge_fields:{

                FNAME:firstname,
                LNAME:lastname,
               }
                            
            
            }
        
            
        ]
    }

    const jsonData = JSON.stringify(data);

    // const url = https://$API_SERVER.api.mailchimp.com/3.0/lists/audience-api
    const url = "https://us2.api.mailchimp.com/3.0/lists/a34409d094";
    const options = {
        method:'POST',
        auth:'Pruthvi:6a166384edbdc6a07f7a625feb1ca3c7-us2'
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
        res.sendFile(__dirname+'/success.html')
    }else{
         res.sendFile(__dirname+'/failure.html')

        }

        response.on('data',function(data){

            console.log(JSON.parse(data));

        })

    })

    request.write(jsonData);
    request.end();


    
});


// for hiruko server
// app.listen(process.env.PORT,function(){
//     console.log('start');
// });

// for js server
// app.listen(2000,function(){
//     console.log('start');
// });

// for both

app.listen(process.env.PORT || 2000,function(){
    console.log('start');
});


// API key
// 6a166384edbdc6a07f7a625feb1ca3c7-us2

// audience
// a34409d094