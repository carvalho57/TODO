(function(win,doc) {
    'use strict';

    var $input = doc.querySelector('[data-js="input"]');  

    $input.addEventListener('keydown', (e) => {
        if(e.key === "Enter")  {
            addTask($input.value);
            $input.value = "";
        }
            
    });

    function addTask(name) {        
        var task = {
            id: Math.floor(Math.random() * 10) + name,
            name: name,
            done: false 
        };
        var list = JSON.parse(win.localStorage.getItem('tasks'));
        list.push(task);
        renderElement(task);
        win.localStorage.setItem('tasks', JSON.stringify(list));
    }

    function listTasks() {
        var list = win.localStorage.getItem('tasks');
        
        if(!list) {
            list = [];
            win.localStorage.setItem('tasks',JSON.stringify(list));
            return;
        }
        
        var tasks = JSON.parse(list);
        tasks.forEach(task => renderElement(task));
       
    }

    function removeTask(name) {

    }
    function markTask(idTask, mark) {
        var list = JSON.parse(win.localStorage.getItem('tasks'));
        list.find(function(item) {
            if(item.id === idTask) {
                item.done = mark;
            }
        });
        win.localStorage.setItem('tasks',JSON.stringify(list));
        
    }

    function renderElement(task) {    
        var $container = doc.getElementById('things');        

        var hold = doc.createElement('div');
        hold.id = task.id;

        var checkbox = doc.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id =  task.id;
        checkbox.checked = task.done;
      

        checkbox.addEventListener('change',function(event) {
            var $label = doc.querySelector('[for="'+event.target.id+'"]');
            if(event.target.checked) {                
                $label.classList.add('line-through');                
            } else {    
                $label.classList.remove('line-through');
            }
            console.log(event,event.target.checked);
            markTask(event.target.id, event.target.checked);
        })

        var label = doc.createElement('label');        
        label.htmlFor = task.id;
        label.innerHTML = task.name;
        if(task.done) {
            label.classList.add('line-through');
        }

        hold.appendChild(checkbox);
        hold.appendChild(label);

        $container.insertBefore(hold,$container.firstChild);
    }

    listTasks();
})(window,document);