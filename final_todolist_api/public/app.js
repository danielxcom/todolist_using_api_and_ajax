//wait to run until dom is ready
/* global $ */
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    })
    
    $('#todoInput').keypress(function(event){
        if(event.which === 13) {
            createTodo();
        }     
    });
    
        /* UPDATE CODE */
    
    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    })
    
    //we listen for a click.
    //within that we look at a span that is clicked.
    $('.list').on('click', 'span', function(event){ //add .list to list, listening to clicks in particular to span inside of the class.
        //We need two things.
        //1. Identify where we are pointing to.
        //2. Removing that specific thing by id.
         /* PROBLEM: We want this to apply for all dynamically generated code. */
                /* REMOVAL CODE */
    //     $(this).parent().remove(); //remove on static page.
    //     //at this juncture we are not removing from db.
        
        event.stopPropagation(); //nifty. If we trigger event, this won't bubble up and trigger parent li.
        //this is needed to differentiate between update function and remove function.
        
        //test our newTodos.data... code works and stores a val in jquery hidden from code.
    //     console.log($(this).parent().data('id'));
    removeTodo($(this).parent()); 
    });
    
    

});

function addTodos(todos) {
    //add todos to page here
    
    todos.forEach(function(todo){
       addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">'+todo.name + '<span>X</span></li>');
    
    /* REMOVAL CODE */
    //newTodo.data... stores the data id of todo._id in jquery.
    newTodo.data('id', todo._id); 
    
    /*UPDATE CODE*/
    //store true/false boolean in jquery.
    newTodo.data('completed', todo.completed);
       if(todo.completed){ //IMPORTANT we use todo we created from backend instead of var newTodo.
       //todo effects all, thus making a crossthrough css on true vals in list.
           newTodo.addClass('done');
       }
       $('.list').append(newTodo);
    //   newTodo.addClass()
}


function createTodo() {
    
    //take val
    var usrInput = $('#todoInput').val();
    
    //send request to create a new todo
    //"/api/todos" need a post request
    $.post("/api/todos", {name: usrInput}) //listen to post
    .then(function(newTodo){
        $('#todoInput').val(''); //set to empty string after enter pressed
        addTodo(newTodo); //adds to display in html
    })
    .catch(function(err){
        console.log(err);
    })
}



/* REMOVAL CODE */

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteURL = '/api/todos/' + clickedId;
        
        //needs url specifics in addTodo
        $.ajax({
            method: "DELETE",
            url: deleteURL //store long mongo id in jquery data
            
        })
        .then(function(data){
            todo.remove(); //remove todo
        })
        .catch(function(err){
            console.log(err);
        })
    };
    
/*UPDATE CODE*/

function updateTodo(todo){
    
    var updateURL = '/api/todos/' + todo.data('id');
    //extr val
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}; 
    
    //first we figure out if a list item has the class done.
    //PROBLEM, someone can change a class when server says it's still completed or incomplete.
    $.ajax({
        method: 'PUT',
        url: updateURL,
        //tell it what data is... has to take a string.
        data: updateData
    })
    .then(function(updatedTodo){
        //update the view
        todo.toggleClass('done');
        //change val of todo.data
        todo.data('completed', isDone); //sees boolean in db. Flips it.
    })
}




