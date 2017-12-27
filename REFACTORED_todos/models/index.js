var mongoose = require("mongoose");
mongoose.set('debug', true); //see what fails.
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise; //allow promise syntax like db.todo.find().then.. etc
//rather than having to do just callback or external Promise lib


module.exports.Todo = require('./todo');

//requires the todo.js file.