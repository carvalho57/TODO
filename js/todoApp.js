(function(doc,win) {
    
    // Selectors
 
    const todoInput = doc.querySelector('[data-js="todoInput"]');
    const todoButton = doc.querySelector('[data-js="todoButton"]');
    const todoList = doc.querySelector('[data-js="todoList"]');    

    //Event Listeners
    function startListeners() {
        todoButton.addEventListener('click', addTodo)
    }
    

    //Functions

    function addTodo(event) {    
        event.preventDefault();
       
        todoList.appendChild(createTodoHTML());
       
    }

    function listTodo() {       
    }

    function removeTodo(name) {

    }
    function markTodo(idtodo, mark) {
       
    }

    function createTodoHTML() {    
        var todoContainer = doc.createElement('div');
        todoContainer.classList.add('todoItem');
        var contentTodo = doc.createElement('span');
        contentTodo.textContent = "Content";

        todoContainer.appendChild(contentTodo);

        var checkButton = doc.createElement('button');
        checkButton.textContent = "Check Button";
        
        todoContainer.appendChild(checkButton);

        var removeButton = doc.createElement('button');
        removeButton.textContent = "Check Button";
        
        todoContainer.appendChild(removeButton);
        
        return todoContainer;
    }

    window.addEventListener('load', startListeners);
})(document,window);