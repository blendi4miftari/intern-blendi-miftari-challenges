const openModalBtn = document.querySelector("#openModal");
const cancelBtn = document.querySelector("#closeModal");
const inputNote = document.querySelector('#inputNote');
const modal = document.querySelector('#modal');
const addNoteBtn = document.querySelector('#addNoteBtn')
const noteList = document.querySelector('#noteList');
const editNoteBtn = document.querySelector('#edit-node')
const filterBtn = document.querySelector('#dropdown-btn')
const filterDropdown = document.querySelector('#dropdown')
const arrowFilterIcon = document.querySelector('.arrow')
const filterAll = document.querySelector('#all');
const filterActive = document.querySelector('#active');
const filterCompleted = document.querySelector('#completed');
const clearCompleted = document.querySelector('#clear-all')
const counterWrapper = document.querySelector('#counter-wrapper')


openModalBtn.addEventListener('click', (e) => {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
});

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal();
})

const hideModal = () => {
    modal.classList.add('hidden')
    document.body.classList.remove('overflow-hidden');
    inputNote.value = '';
}

filterBtn.addEventListener('click', () => {
    filterDropdown.classList.remove('hidden');
})

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden')
    }

    if (e.target !== filterBtn && e.target !== arrowFilterIcon) {
        filterDropdown.classList.add('hidden');
    }
})

function displayNotes() {
    const notesFromStorage = getNotesFromLocalStorage();
    noteList.innerHTML = ''
    showCounter()
    notesFromStorage.forEach(n => {
        addNoteToDOM(n.note, n.status);
    })
}

function displayCompletedNotes() {
    const notesFromStorage = getNotesFromLocalStorage();
    noteList.innerHTML = ''
    notesFromStorage.forEach(n => {
        if (n.status === 'completed') {
            addNoteToDOM(n.note, n.status);
        }
    })
}

function displayActiveNotes() {
    const notesFromStorage = getNotesFromLocalStorage();
    noteList.innerHTML = ''
    notesFromStorage.forEach(n => {
        if (n.status === 'active') {
            addNoteToDOM(n.note, n.status);
        }
    })
}


const addNote = (e) => {
    e.preventDefault();

    const newNote = inputNote.value;

    const notesFromLocalStorage = getNotesFromLocalStorage();

    const isDuplicated = notesFromLocalStorage.some(n => {
        if (n.note === newNote) {
            console.log(n.note)
            return true
        }
    })

    console.log(isDuplicated)

    if (newNote === '') {
        alert('Please add a note');
        return;
    } else if (isDuplicated) {
        alert('You already have this exact same note! Try another!!');
        return
    }

    addNoteToDOM(newNote);
    addNoteToLocalStorage(newNote);
    showCounter()
}

const addNoteToDOM = (note, status = 'active') => {
    const noteWrapper = document.createElement('div');
    noteWrapper.classList.add('note-row', 'flex', 'flex-row', 'items-center', 'pb-3', 'border-b', 'border-violet-400', 'space-x-4'); 
    noteWrapper.innerHTML = `
                            <input ${status !== 'active' ? 'checked' : '' } class="h-5 w-5 cursor-pointer shadow-sm shadow-violet-500 p-10 text-sm " type="checkbox" id='note-checkbox'>
                            <div class="flex flex-row group justify-between items-center w-full">
                                    <h3 class="font-medium ${status !== 'active' ? 'line-through text-gray-400' : '' }">${note}</h3> 
                                    <button id="delete-note">
                                        <svg class="h-4 w-4 hidden group-hover:block cursor-pointer" viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg>
                                    </button>
                            </div>
    `
    hideModal();
    const newNote = document.querySelector('#noteList').appendChild(noteWrapper);

    return newNote;
}

function addNoteToLocalStorage(note) {
    const notesFromStorage = getNotesFromLocalStorage();

    const notesObj = { note: note, status: 'active' }
    
    notesFromStorage.push(notesObj);

    localStorage.setItem('notes', JSON.stringify(notesFromStorage) )
}

function getNotesFromLocalStorage() {
    let notesFromStorage;

    if (localStorage.getItem('notes') === null) {
        notesFromStorage = [];
    } else {
        notesFromStorage = JSON.parse(localStorage.getItem('notes'))
    }

    return notesFromStorage;

}

const removeNote = (e) => {
    if (e.target.closest('#delete-note')) {
        if (window.confirm('Are you sure you want to delete this note ?')) {
            const deletedNote = e.target.closest('.note-row');
            deletedNote.remove()
            console.log(deletedNote.lastElementChild.firstElementChild.textContent)
            removeNoteFromLocalStorage(deletedNote.lastElementChild.firstElementChild.textContent);
        } else {
            return;
        }
    }
}

function removeNoteFromLocalStorage(note){
    let notesFromStorage = getNotesFromLocalStorage();

    console.log(note)

    notesFromStorage = notesFromStorage.filter((n) => n.note !== note);

    console.log(notesFromStorage)

    localStorage.setItem('notes', JSON.stringify(notesFromStorage));

}

function setCompletedNote(e) {
    if (e.target.matches('#note-checkbox')) {
        const noteText = e.target.closest('.note-row').querySelector('h3');
        noteText.classList.toggle('line-through')
        noteText.classList.toggle('text-gray-400')
        const isChecked = e.target.closest('.note-row').firstElementChild.checked
        changeStatus(noteText, isChecked)
    }
}

function changeStatus(noteText, isChecked) {
    const notesFromLocalStorage = getNotesFromLocalStorage();

    notesFromLocalStorage.map(n => {
        if (n.note === noteText.textContent && isChecked) {
            n.status = 'completed'
        } else if (n.note === noteText.textContent && !isChecked) {
            n.status = 'active'
        }
    })

    localStorage.setItem('notes', JSON.stringify(notesFromLocalStorage));
}

function clearAllCompletedNotes() {
    const notesFromLocalStorage = getNotesFromLocalStorage();

      const activeNotes = notesFromLocalStorage.filter(n => {
          if (n.status === 'active') {
              return n.note
          }
    })
    
    localStorage.setItem('notes', JSON.stringify(activeNotes));

    displayNotes();
}

function showCounter() {
    notesFromLocalStorage = getNotesFromLocalStorage();
    counterWrapper.innerHTML = `
        <h1 class="text-sm text-gray-500">${ notesFromLocalStorage.length === 1 ? `${notesFromLocalStorage.length} note` : `${notesFromLocalStorage.length} notes` }  left</h1>
    `;
}

function init() {
    addNoteBtn.addEventListener('click', addNote);
    noteList.addEventListener('click', removeNote);
    noteList.addEventListener('change', setCompletedNote);
    filterAll.addEventListener('click', displayNotes)
    filterCompleted.addEventListener('click', displayCompletedNotes)
    filterActive.addEventListener('click', displayActiveNotes)
    clearCompleted.addEventListener('click', clearAllCompletedNotes)
    document.addEventListener('DOMContentLoaded', displayNotes)
}

init();
