const express= require("express");
const bodyparser= require("body-parser");
const request= require("request");
const https= require("https");


const app= express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req,res)
{
 res.sendFile(__dirname + "/newsletter.html");
});


app.post("/", function(req,res)
{

    const fname= req.body.fn;
    const lname= req.body.ln;
    const email= req.body.email;
const data= {
    members: [
        {
            email_address: email,
            status:"subscribed",
            merge_fields: {
            FNAME: fname,
            LNAME: lname
            }
        }
    ]
}; 
const jsondata= JSON.stringify(data);

const url= "https://us10.api.mailchimp.com/3.0/lists/723ca559ea";

const options= {
    method: "POST",
    auth: "shreya____12:49476092e512f99002d93fcdb1ae493b-us10"

};

const request= https.request(url, options, function(response)
{
if(response.statusCode==200)
{
    res.sendFile(__dirname + "/success.html");
}
else{
    res.sendFile(__dirname + "/failure.html");
}


  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
 
});


   

    //request.write(jsondata);
    request.end();

});
   

    // console.log(fname, lname, email);


app.post("/failure", function(req,res)
{
res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is runnung on port 3000");
});


//49476092e512f99002d93fcdb1ae493b-us10
//   723ca559ea

