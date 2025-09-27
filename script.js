// Load tasks when page starts
window.onload = loadTasks;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  saveTask(task);
  renderTask(task);

  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = task.text;
  li.appendChild(span);

  if (task.completed) {
    li.classList.add("completed");
  }

  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    task.completed = !task.completed;
    updateStorage();
  };
  actions.appendChild(completeBtn);

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", task.text);
    if (newText && newText.trim() !== "") {
      task.text = newText.trim();
      span.textContent = task.text;
      updateStorage();
    }
  };
  actions.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(task.text);
  };
  actions.appendChild(deleteBtn);

  li.appendChild(actions);
  document.getElementById("taskList").appendChild(li);
}

// ---- Local Storage Functions ----
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));
}
