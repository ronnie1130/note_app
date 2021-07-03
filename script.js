const addBtnBlue = document.getElementById('add1')
const addBtnRed = document.getElementById('add2')
const addBtnGreen = document.getElementById('add3')

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach((note) => addNewNote(note))
}

addBtnBlue.addEventListener('click', () => addNewNote('', 'blue'))
addBtnRed.addEventListener('click', () => addNewNote('', 'red'))
addBtnGreen.addEventListener('click', () => addNewNote('', 'green'))

function addNewNote(text = '', bgc) {
  const note = document.createElement('div')
  note.classList.add('note')
  note.classList.add(`note-${bgc}`)

  note.innerHTML = ` 
    <button class="edit"><i class="far fa-edit"></i></button>
    <button class="delete"><i class="far fa-trash-alt"></i></button>
<div class="main ${text ? '' : 'hidden'}"></div>
<textarea class="${text ? 'hidden' : ''}"></textarea>
`
  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  main.innerHTML = marked(text)

  deleteBtn.addEventListener('click', () => {
    note.remove()
    updateLS()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target

    main.innerHTML = marked(value)

    updateLS()
  })

  document.body.appendChild(note)
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')
  const color = note.className
  console.log(color)

  const notes = []

  notesText.forEach((note) => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}
