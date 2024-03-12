document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = task.title;
            if (task.completed) {
                listItem.classList.add('complete');
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            listItem.appendChild(deleteBtn);
            listItem.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });
            taskList.appendChild(listItem);
        });
    };

    // Add task event listener
    addTaskBtn.addEventListener('click', () => {
        const taskTitle = taskInput.value.trim();
        if (taskTitle !== '') {
            tasks.push({ title: taskTitle, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    // Initial render
    renderTasks();
});
