const button = document.getElementById("btn");
const message = document.getElementById("message");

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const STORAGE_KEY = "todoTasks";

button.addEventListener("click", function () {
  message.textContent = "Я уже умею писать JavaScript!";
  message.style.color = "green";
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

function saveTasks() {
  const tasks = [];

  taskList.querySelectorAll("li").forEach(function (li) {
    tasks.push({
      text: li.dataset.text,
      done: li.classList.contains("done")
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskItem(text, done = false) {
  const li = document.createElement("li");
  li.dataset.text = text;
  li.textContent = text;

  if (done) {
    li.classList.add("done");
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";

  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);

  li.addEventListener("click", function () {
    li.classList.toggle("done");
    saveTasks();
  });

  return li;
}

function loadTasks() {
  let savedTasks = [];

  try {
    savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("Не удалось прочитать задачи:", error);
  }

  savedTasks.forEach(function (task) {
    const li = createTaskItem(task.text, task.done);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText) {
    const li = createTaskItem(taskText);
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
  }
});

loadTasks();