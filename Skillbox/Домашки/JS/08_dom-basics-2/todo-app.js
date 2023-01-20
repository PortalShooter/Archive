let localArray = [];

function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}
function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div')
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.setAttribute('disabled', 'disabled')

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button,
    };

}
function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}
// Синхронизация массива и локальных данных ================
 function synchronization(key) {
  localStorage.setItem(key, JSON.stringify(localArray))
}
//==========================================================
function createTodoItem(name) {
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger')
  deleteButton.textContent = 'Удалить';

  nextIndex:for(let index = 1; index <= localArray.length + 1; ++index){
    for(let n of localArray) {
      if(n.index == index) continue nextIndex
    }
    item.setAttribute('index', index)

    break
  }

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
      item,
      doneButton,
      deleteButton,
  };
}
function createTodoApp(container, title = 'Список дел', todoListInitial) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

 // Загрузка данных из локальной памяти ==================================
 if(localStorage.getItem(title) === null) {
  localStorage.setItem(title, JSON.stringify(todoListInitial));
} else {
  todoListInitial = JSON.parse(localStorage.getItem(title));
}
localArray = todoListInitial
  //=======================================================================

 if(localArray){
  localArray.forEach(element => {

    let todoItem = createTodoItem(element.name);
    if(element.done){
      todoItem.item.classList.add('list-group-item-success')
    }

    element.index = todoItem.item.getAttribute('index')
    btns(todoItem)
    todoList.append(todoItem.item);
  });
 }
  //Проверка на наличие текста в форме ====================================
  todoItemForm.input.onkeyup = check
  function check() {
    if(!todoItemForm.input.value) {
      todoItemForm.button.setAttribute('disabled', 'disabled')
    } else (todoItemForm.button.removeAttribute('disabled', 'disabled'))
  }
  //=======================================================================


  todoItemForm.form.addEventListener('submit', function(e) {
    e.preventDefault();
    let todoItem = createTodoItem(todoItemForm.input.value);
    btns(todoItem)

    nextIndex:for(let index = 1; index <= localArray.length + 1; ++index){
      for(let n of localArray) {
        if(n.index == index) continue nextIndex
      }
      todoItem.item.setAttribute('index', index);
      break
    }

    localArray.push({name: todoItemForm.input.value, done: false, index: todoItem.item.getAttribute('index')})

    todoList.append(todoItem.item);
    todoItemForm.input.value = '';
    todoItemForm.button.setAttribute('disabled', 'disabled')

    synchronization(title)
  });

  // Кнопки "Готово" и "удалить" =============================
  function btns(todoItem) {
    todoItem.doneButton.addEventListener('click', function() {
      todoItem.item.classList.toggle('list-group-item-success');
      localArray.forEach(el => {
        if(el.index == todoItem.item.getAttribute('index')) el.done?el.done = false: el.done = true;
      })
      synchronization(title)
    })
    todoItem.deleteButton.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
        for(let key in localArray){
          if(localArray[key].index == todoItem.item.getAttribute('index')) localArray.splice(key,1)
        }
        todoItem.item.remove();
      }
      synchronization(title)
    })
  }
  //==========================================================
}
window.createTodoApp = createTodoApp;
