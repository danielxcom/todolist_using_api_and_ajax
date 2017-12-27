var express = require("express");
var router = express.Router(); //break routes out to modular chunks
var db = require("../models"); 




/* PART OF GET ROUTE */

router.get('/', function(req, res){
    db.Todo.find()
    //list all todos.

    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    });
});
/* POST ROUTE : Create Todo*/
router.post('/', function(req, res){
//   res.send("THIS IS THE POST ROUTE"); 
    // console.log(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo){ //we want these things to come back from api
        res.status(201).json(newTodo); //respond with newly created todo
        //important to know it worked
        //send status(201) so when we create things it shows up on Postman 201 created.
        
    })
    .catch(function(err){
        res.send(err);
    })
});

/* SHOW ROUTE : Retrieve information of specific todo */
router.get('/:todoId', function(req, res){
   db.Todo.findById(req.params.todoId)
   .then(function(foundTodo){
       res.json(foundTodo)
   })
   .catch(function(err){
       res.send(err)
   })
});

/* PUT ROUTE : Update a todo*/
router.put('/:todoId', function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}) //used to be you had to find based off singular id and update separately.
    //new: true responds with new version in PUT req in POSTMAN
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
});

/* DELETE ROUTE: Delete a todo */
router.delete('/:todoId', function(req, res){
    // res.send("DELETE DELETE DELETE! - said the trashcan")

    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "We deleted it!"})
    
        
    })
    .catch(function(err){
        res.send(err);
    })
});




module.exports = router;