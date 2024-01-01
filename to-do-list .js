// Getting references to HTML elements
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");

// Loading tasks from localStorage on page load
window.onload = function () {
  loadTasks();
};

// Function to add a new task
function addTask() {
  var task = taskInput.value;
  if (task === '') {
    alert("Please enter a task!");
    return;
  }

  var taskItem = {
    type: "نوع کار",
    // description: "توضیح درباره آن",
    date: new Date().toISOString().slice(0, 10)
  };

  localStorage.setItem(task, JSON.stringify(taskItem));
  createTaskElement(task, taskItem);

  taskInput.value = '';
}

// Function to load tasks from localStorage and display them
function loadTasks() {
  for (var i = 0; i < localStorage.length; i++) {
    var task = localStorage.key(i);
    var taskItem = JSON.parse(localStorage.getItem(task));
    createTaskElement(task, taskItem);
  }
}

// Function to create a task element
function createTaskElement(task, taskItem) {
  var taskElement = document.createElement("li");
  var taskText = document.createElement("span");
  taskText.innerText = task + " - " + taskItem.date;

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    editTask(task);
  };

  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.onclick = function () {
    deleteTask(task, taskElement);
  };

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onchange = function () {
    toggleTaskStatus(taskText, checkBox);
  };

  // Checking if task is already completed
  if (localStorage.getItem(task + "-completed")) {
    checkBox.checked = true;
    taskText.classList.add("completed");
  }

  taskElement.appendChild(checkBox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);

  taskList.appendChild(taskElement);
}

// Function to edit a task
function editTask(task) {
  var newTask = prompt("Enter new task", task);
  if (newTask !== null && newTask !== '') {
    var taskItem = JSON.parse(localStorage.getItem(task));
    localStorage.removeItem(task);
    localStorage.setItem(newTask, JSON.stringify(taskItem));
    location.reload();
  }
}

// Function to delete a task
function deleteTask(task, taskElement) {
  if (confirm("Are you sure you want to delete this task?")) {
    localStorage.removeItem(task);
    localStorage.removeItem(task + "-completed");
    taskElement.remove();
  }
}

// Function to toggle task status
function toggleTaskStatus(taskText, checkBox) {
  if (checkBox.checked) {
    taskText.classList.add("completed");
    localStorage.setItem(taskText.innerText.split(" - ")[0] + "-completed", true);
  } else {
    taskText.classList.remove("completed");
    localStorage.removeItem(taskText.innerText.split(" - ")[0] + "-completed");
  }
}