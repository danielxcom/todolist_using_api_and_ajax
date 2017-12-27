    
    //module.exports vs exports 
    //module.exports exports entire thing.
    //module.exports = "Daniel" means the module is simply the string Daniel.
    //exports on the other hand is an obj we can attach to. They will be part of parent obj. Parent sometimes being module.js
    //exports.student = "Daniel" we export out obj with key of student.
    //add as many to exports obj as we want.
    //https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js
    //module.js is called when we do module.exports


var db = require("../models");

exports.getTodos = function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTodo = function(req, res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.showTodo = function(req, res){
    
    db.Todo.findById(req.params.todoId) //find based off paramaters in the route variable /:todoId/somethingsomething
    .then(function(findTodo){
        res.json(findTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo = function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body)
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.deleteTodo = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: "We delete it!"})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;    






