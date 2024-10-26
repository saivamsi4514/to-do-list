// Select elements
const taskInput = document.getElementById('taskInput');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener to the add button
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (taskText === '' || startTime === '' || endTime === '') {
        alert('Please fill in all fields');
        return;
    }

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="check">
        <span>${taskText}</span>
        <div class="time-details">Start: ${startTime} | End: ${endTime}</div>
        <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(listItem);
    taskInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';

    // Save the task to local storage
    saveTasks();

    // Add event listeners to checkbox and delete button
    listItem.querySelector('.check').addEventListener('change', toggleTask);
    listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
}

// Function to toggle task completion
function toggleTask() {
    this.parentElement.classList.toggle('completed');
    saveTasks();
}

// Function to delete a task
function deleteTask() {
    this.parentElement.remove();
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(listItem => {
        const taskText = listItem.querySelector('span').textContent;
        const timeDetails = listItem.querySelector('.time-details').textContent.split('|');
        const startTime = timeDetails[0].split(' ')[1];
        const endTime = timeDetails[1].split(' ')[2];
        const isCompleted = listItem.classList.contains('completed');
        tasks.push({ text: taskText, startTime, endTime, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" class="check" ${task.completed ? 'checked' : ''}>
            <span>${task.text}</span>
            <div class="time-details">Start: ${task.startTime} | End: ${task.endTime}</div>
            <button class="delete-btn">Delete</button>
        `;
        if (task.completed) listItem.classList.add('completed');
        taskList.appendChild(listItem);

        // Add event listeners to checkbox and delete button
        listItem.querySelector('.check').addEventListener('change', toggleTask);
        listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
    });
}
