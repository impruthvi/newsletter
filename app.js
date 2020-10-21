const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
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
        response.on('data',function(data){

            console.log(JSON.parse(data));

        })

    })

    request.write(jsonData);
    request.end();


    
});

app.listen(2000,function(){
    console.log('start');
});


// API key
// 6a166384edbdc6a07f7a625feb1ca3c7-us2

// audience
// a34409d094