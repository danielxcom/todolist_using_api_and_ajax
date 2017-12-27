//when we require, we auto look for index.js in models
//it connects us to mongoose.

var express = require("express"),
    app     = express(), 
    //refactor port variable
    port = process.env.PORT || 3000,
    //3000 if you are running locally w/o c9.
    bodyParser = require("body-parser"); //POST
    
var todoRoutes = require('./routes/todos');

app.use(bodyParser.json()); //POST
app.use(bodyParser.urlencoded({extended: true})); //access req.body in put or post req

// app.get('/', function(req, res){
//     // res.send({message:'Hiya from Express!'}); //parent. Once passed obj, pass it down to json, then that passes to json.stringify.
//     // res.json({message: 'Hi from JS obj'});
//     res.json("{data: 12311414}") //send as json obj.
// });

//------------------------------------------------//

//tell express start urls like this. 
app.use('/api/todos', todoRoutes);

/*GET ROUTE : LIST ALL TODOS*/
app.get('/', function(req, res){
    res.send('HELLO FROM THE ROOT ROUTE');
})



app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
}); //localhost PORT for c9.


