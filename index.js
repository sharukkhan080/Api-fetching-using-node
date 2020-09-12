const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/post",function (req,res) {
  var data={
    members:[
      {
        email_address:req.body.email,
        status:"subscribed",
        merge_fields:{
          FNAME:req.body.firstName,
          LNAME:req.body.lastName
        }
      }
    ]
  };
  var jsonFile=JSON.stringify(data);
  const url="https://us17.api.mailchimp.com/3.0/lists/uniqueid";
  const options={
    method:"POST",
    auth:"srk80:your api key"
  }

  const request1=https.request(url,options,function (response) {
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/fail.html");
    }
    response.on("data",function (data) {
      console.log(JSON.parse(data));
    })
  })
  request1.write(jsonFile);
  request1.end();
});

app.post("/fail",function (req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT ||3000,function () {
  console.log("server running at 3000....");
});
//45decOca8b
//b9ac91314d3968197d5093ef588ffaa0-us18
