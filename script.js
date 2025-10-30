
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


window.onload = function() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
}


addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if(taskText !== '') {
    const task = { text: taskText, completed: false };
    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = ''; 
  }
});


function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.textContent = task.text;


  if(task.completed) li.classList.add('completed');


  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  li.appendChild(deleteBtn);

  taskList.appendChild(li);


  li.addEventListener('click', function(e) {
    if(e.target !== deleteBtn) {
      li.classList.toggle('completed');
      updateLocalStorage();
    }
  });

 
  deleteBtn.addEventListener('click', function() {
    li.remove();
    updateLocalStorage();
  });
}


function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function updateLocalStorage() {
  let tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
