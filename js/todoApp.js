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
        createTodoHTML(todoInput.value);                  
        saveTodoLocal(todoInput.value);
        clearTodo();
    }

    function clearTodo() { todoInput.value = ""; } 

    function removeTodo(event) {
        const todo = event.target.parentElement;
        todo.remove();        
        removeTodoLocal(todo.firstElementChild.textContent);
    }
    
    function checkTodo(event) {
        const todo = event.target.parentElement;        
        todo.classList.toggle('completed')
    }

    function createTodoHTML(content) {    
        var todoContainer = doc.createElement('div');
        todoContainer.classList.add('todoItem');

        var contentTodo = doc.createElement('span');
        contentTodo.textContent = content;
        
        todoContainer.appendChild(contentTodo);    
        todoContainer.appendChild(createRemoveButton());
        todoContainer.appendChild(createCheckButton()); 
        todoList.appendChild(todoContainer);
    }

    function createRemoveButton() {
        var removeButton = doc.createElement('button');
        removeButton.textContent = "Remover";
        removeButton.classList.add('todobuttonRemove');
        removeButton.addEventListener('click',removeTodo);
        return removeButton;
    }
    function createCheckButton() {
        var checkButton = doc.createElement('button');
        checkButton.textContent = "Check";
        checkButton.classList.add('todobuttonCheck');
        checkButton.addEventListener('click',checkTodo)
        return checkButton;
    }

    function saveTodoLocal(todo) {
        var listTodos = JSON.parse(getTodosLocal());
        listTodos.push(todo);        
        win.localStorage.setItem('todos', JSON.stringify(listTodos));
    }

    function getTodosLocal() {
        return win.localStorage.getItem('todos');
    }
    function listTodosLocal() {
        var todos = JSON.parse(getTodosLocal());
        todos.forEach(todo => createTodoHTML(todo));
    } 

    function removeTodoLocal(todo) {
        var listTodos = JSON.parse(getTodosLocal());
        let indexTodo = listTodos.findIndex(item => item === todo);
        listTodos.pop(indexTodo);
        win.localStorage.setItem('todos', JSON.stringify(listTodos));
    }

    function createLocalItemsIfNotExist() {
        const list = getTodosLocal();
        if(!list) {
            list = [];
            win.localStorage.setItem('todos', JSON.stringify(list));            
        }
    }
    win.addEventListener('DOMContentLoaded', createLocalItemsIfNotExist);
    win.addEventListener('load', listTodosLocal);
    win.addEventListener('load', startListeners);
    
})(document,window);
