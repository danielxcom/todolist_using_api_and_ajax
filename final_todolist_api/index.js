var express = require("express"),
    app     = express(),
    port   = process.env.PORT || 3000,
    bodyParser = require("body-parser");
    
    
var todoRoutes = require("./routes/todos");
    
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 
//these two lines access req body.

//this essentially must be placed above app.get
//express.static points to directories with html, css, js
//serves us static files
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
//start server from another dir w/o __dirname we get error.
//__dirname is used to be explicit

app.get("/", function(req, res){
    res.sendFile("index.html");
})

//PREFIX for all routes    
app.use("/api/todos", todoRoutes);
app.listen(port, function(){
    console.log("Our app is running " + port);
});

