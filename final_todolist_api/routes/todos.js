var express = require("express"),
    router = express.Router(),
    db    = require("../models"), //auto-requires index 
    helpers = require("../helpers/todos");
// router.get("/", function(req, res){
//     // res.send("Hello from todos routes!");

// });

// //post
// router.post("/", function(req, res){
//     db.Todo.create(req.body)
//     .then(function(newTodo){
//         res.status(201).json(newTodo); //explicit. States in Postman, 201 created.
//     })
//     .catch(function(err){
//         res.send(err);
//     })
// });

/* REFACTORED FROM NOW ON */
//we want routes that are explicit and simple

router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo)

router.route('/:todoId')
    .get(helpers.getTodos)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;