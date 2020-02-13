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
            name: name
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

    function renderElement(task) {    
        var $container = doc.getElementById('things');

        var hold = doc.createElement('div');
        hold.id = task.id;

        var checkbox = doc.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id =  task.id;
        checkbox.addEventListener('change',function(event) {
            var $label = doc.querySelector('[for="'+event.target.id+'"]');
            if(event.target.checked) {                
                $label.classList.add('line-through');
            } else {
                $label.classList.remove('line-through');
            }
            
        })

        var label = doc.createElement('label');
        label.htmlFor = task.id;
        label.innerHTML = task.name;

        hold.appendChild(checkbox);
        hold.appendChild(label);

        $container.insertBefore(hold,$container.firstChild);
    }

    listTasks();
})(window,document);