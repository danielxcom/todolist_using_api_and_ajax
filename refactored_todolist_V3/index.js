var express = require("express"),
    app     = express(),
    port   = process.env.PORT || 3000,
    bodyParser = require("body-parser");
    
    
var todoRoutes = require("./routes/todos");
    
app.get("/", function(req, res){
    res.send("Hello from the root route");
    })
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); 
//these two lines access req body.

//PREFIX for all routes    
app.use("/api/todos", todoRoutes);
app.listen(port, function(){
    console.log("Our app is running " + port);
});

