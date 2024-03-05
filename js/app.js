const createForm = document.getElementById("create-form");
const formEdit = document.getElementById("input-create");
const listGroupTodo = document.getElementById("todos-ul-list");
const changeForm = document.getElementById("change-form");
const changeInput = document.getElementById("change-input");
const changeError = document.getElementById("change-error");
// const messageCreate = document.getElementById("messageCreate");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

const colseModal = document.getElementById("close-modal");

//full time elements
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const hourEl1 = document.getElementById("hour1");
const minuteEl1 = document.getElementById("minute1");
const secondEl1 = document.getElementById("second1");

let editItemId;

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

//set Todos localstorage-Localstoragega saqlash funksiyasi

function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

//function time-vaqt funksiyasi

function getTime() {
  //yil oy kun
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  //soat minut sekund
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const month_title = now.getMonth();
  //sanalarni chiqarish
  fullDay.textContent = `${date} ${months[month_title]}, ${year} yil`;
  //vaqtni chiqarish
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;

  hourEl1.textContent = hour;
  minuteEl1.textContent = minute;
  secondEl1.textContent = second;
  //return qilamiz
  return `${hour}:${minute}:${second}, ${date}.${month}.${year}`;
}

setInterval(getTime, 1000);

//show todos-todolarni ko'rsatish funksiyasi
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${i})" class="form-label list-group-item d-flex justify-content-between ${
      item.completed == true ? "completed" : ""
    }" >
    ${item.text}
<div class="todo-icons">
  <span class="opacity-50 me-2">${item.time}</span>
  <img onclick=(editTodo(${i})) src="img/edit.svg" alt="edit icon" width="25" height="25">
  <img  onclick=(deleteTodo(${i}))  src="img/delete.svg" alt="delete icon" width="25" height="25">
</div>
</li>
    `;
  });
}

//showError-xato xabarini ko'rsatish funksiyasi
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

/*
<li class="list-group-item d-flex justify-content-between">
hello word
<div class="todo-icons">
  <span class="opacity-50 me-2">03.03.2024</span>
  <img src="img/edit.svg" alt="edit icon" width="25" height="25">
  <img src="img/delete.svg" alt="delete icon" width="25" height="25">
</div>
</li>
*/

//get Todos - todolarni inputdan olish

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = createForm["input-create"].value.trim();
  createForm.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showTodos();
  } else {
    showMessage("messageCreate", "Iltimos, vazifa kiriting...");
  }
});

//delete todo - todlarni o'chirish funksiuyasi
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    // console.log(item)
    return i !== id;
  });
  todos = deletedTodos;
  setTodos();
  showTodos();
}

deleteTodo();

//set completed- vazifa tuganlandi funksiyasi
function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = completedTodos;
  setTodos();
  showTodos();
}

setCompleted();

//editForem

changeForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const todoText = changeInput.value.trim();
  changeInput.value = "";
  if (todoText.length) {
    todos.splice(editItemId, 1,({ text: todoText, time: getTime(), completed: false }));
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("change-error", "Iltimos, vazifa kiriting...");
  }
})

//closeModal

colseModal.addEventListener("click", () => {
  close();
});


document.addEventListener('keydown',(e)=>{
  if(e.key === 'Escape'){
    close();
  }
})
//editTodo

function editTodo(id) {
  open();
  editItemId = id;
}

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
open();
function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

close();

