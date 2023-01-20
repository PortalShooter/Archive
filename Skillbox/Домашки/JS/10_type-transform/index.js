'use strict'
let students = [
  {
    name: 'Илья',
    surname: 'Куцевалов',
    patronymic: 'Андреевич',
    dob: new Date(1999, 11, 25),
    dateOfLearning: 2017,
    faculty: 'Машинное обучение',
  },
  {
    name: 'Анна',
    surname: 'Сорокина',
    patronymic: 'Александровна',
    dob: new Date(2001, 0, 6),
    dateOfLearning: 2019,
    faculty: 'Прикладная информатика',
  },
  {
    name: 'Даниил',
    surname: 'Власенко',
    patronymic: 'Алексеевич',
    dob: new Date(1976, 5, 14),
    dateOfLearning: 2017,
    faculty: 'История',
  },
  {
    name: 'Кирилл',
    surname: 'Ясониди',
    patronymic: 'Олегович',
    dob: new Date(1997, 3, 20),
    dateOfLearning: 2015,
    faculty: 'Логистика',
  },
  {
    name: 'Дмитрий',
    surname: 'Сариев',
    patronymic: 'Алексеевич',
    dob: new Date(1985, 8, 6),
    dateOfLearning: 2020,
    faculty: 'Энергетика',
  },
];
const table = document.createElement('table')

function createTable(data) {

  table.classList.add('table')
  document.querySelector('.table').append(table)
  createTitle()
  createRow('search')
  createRow('header')
  data.forEach(student => {
    createRow(student)
  })

  function createTitle() {
    const title = document.createElement('caption')
    title.textContent = 'Список студентов';
    title.classList.add('title')
    table.append(title)
  }
  sortTable()
}
createTable(students)
function createRow(student) {
  const row = document.createElement('tr')
  row.classList.add('row')
  table.append(row)
  createColumn(row, student)

  function createColumn(row, student) {
    for (let i = 0; i < 4; i++) {
      let column
      const header = ['ФИО студента', 'Факультет', 'Дата рождения', 'Годы обучения']
      if (student === 'search') {
        column = document.createElement('th')
        const inputSearch = document.createElement('input')
        inputSearch.classList.add('input-search')
        column.append(inputSearch)
      } else if (student === 'header') {
        column = document.createElement('th')
        column.classList.add('header-column')
        column.textContent = header[i]
      }
      else {
        let startYears = new Date().getFullYear() - student.dateOfLearning
        if (startYears > 4 || startYears == 4 && new Date().getMonth() > 8) startYears = 'Закончил'
        column = document.createElement('td')
        if (i === 0) column.textContent = `${student.surname} ${student.name} ${student.patronymic}`
        else if (i === 1) column.textContent = `${student.faculty}`
        else if (i === 2) column.textContent = `${student.dob.getDate()}.${student.dob.getMonth() + 1}.${student.dob.getFullYear()} (${new Date().getFullYear() - student.dob.getFullYear()})`
        else if (i === 3) column.textContent = `${student.dateOfLearning}-${student.dateOfLearning + 4} (${startYears})`
      }
      row.append(column)
    }
  }
}
function sortTable() {
  const headerColumn = document.querySelectorAll('.header-column')
  headerColumn.forEach((cell, indexCell) => {
    cell.addEventListener('click', () => {
      if (indexCell === 0) {
        students.sort(function (a, b) {
          const nameA = (a.surname + a.name + a.patronymic).toLowerCase(),
            nameB = (b.surname + b.name + b.patronymic).toLowerCase()
          if (nameA < nameB) //сортируем строки по возрастанию
            return -1
          if (nameA > nameB)
            return 1
          return 0 // Никакой сортировки
        })
      }
      if (indexCell === 1) {
        students.sort(function (a, b) {
          const nameA = a.faculty.toLowerCase(),
            nameB = b.faculty.toLowerCase()
          if (nameA < nameB) //сортируем строки по возрастанию
            return -1
          if (nameA > nameB)
            return 1
          return 0 // Никакой сортировки
        })
      }
      if (indexCell === 2) {
        students.sort(function (a, b) {
          const dateA = new Date(a.dob), dateB = new Date(b.dob)
          return dateA - dateB //сортировка по возрастающей дате
        })
      }
      if (indexCell === 3) {
        students.sort(function (a, b) {
          const dateA = new Date(a.dateOfLearning), dateB = new Date(b.dateOfLearning)
          return dateA - dateB //сортировка по возрастающей дате
        })
      }
      table.textContent = ''
      createTable(students)
    })
  })
}

document.querySelector('button').addEventListener('click', () => {
  const inputName = document.querySelector('.input-name').value
  const inputSurname = document.querySelector('.input-surname').value
  const inputPatronymic = document.querySelector('.input-patronymic').value
  const inputFaculty = document.querySelector('.faculty').value
  const inputDob = document.querySelector('.dob').value
  const inputDateOfLearning = +document.querySelector('.dateOfLearning').value
  if(inputName && inputSurname && inputPatronymic && inputFaculty && inputDob && inputDateOfLearning) {
    if(new Date(inputDob) > new Date('1900-01-01') && new Date(inputDob) < new Date()) {
      if(inputDateOfLearning >= 2000 && inputDateOfLearning <= new Date().getFullYear()) {
        students.push({
          name: inputName,
          surname: inputSurname,
          patronymic: inputPatronymic,
          dob: new Date(inputDob),
          dateOfLearning: inputDateOfLearning,
          faculty: inputFaculty,
        })
        table.textContent = ''
        createTable(students)
      } else alert('Некорректная дата начала обучения')
    } else alert('Некорректная дата рождения')
  } else alert('Все поля обязательны для заполнения')
})

document.querySelectorAll('.input-search').forEach((el, index) => {
  el.oninput = () => {
    document.querySelectorAll('.row').forEach((row, indexRow) => {
      if(indexRow > 1) {
        row.remove()
      }
    })
    students.map(student => {
      const fullName =`${student.surname} ${student.name} ${student.patronymic}`
      if(fullName.includes(el.value) || student.faculty.includes(el.value) || (`${student.dob.getDate()}.${student.dob.getMonth() + 1}.${student.dob.getFullYear()} (${new Date().getFullYear() - student.dob.getFullYear()})`).includes(el.value) || String(student.dateOfLearning).includes(el.value)) {
        createRow(student)
      }
    })
  }
})
