import { getCardsFromLocalStorage, saveCardOnLocalStorage } from "./storage.js";
import { createCard } from "./cards.js";

export const modal = () => {
    const modal = document.querySelector("#modal");
    const todoAddBtn = document.querySelector("#todo-add-button");
    const inprogressAddBtn = document.querySelector("#inprogress-add-button");
    const doneAddBtn = document.querySelector("#done-add-button");
    const addTaskBtn = document.querySelector("#addTaskBtn");
    const inputTitle = document.querySelector("#inputTitle");
    const inputDescription = document.querySelector("#inputDescription");
    const closeModal = document.querySelector("#closeModal");

    let currentStatus;

    todoAddBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        currentStatus = "todo"
    });

    inprogressAddBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        currentStatus = 'inprogress'
    });

    doneAddBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        currentStatus = 'done'

    });

    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault()
        if (inputTitle.value === '') {
            alert('Please fill the title!')
            return
        } else {
            createCard(inputTitle.value, inputDescription.value, currentStatus);
            hideModal()
        }
    });

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal()
    })

    function hideModal() {
        modal.classList.add("hidden")
        document.body.classList.remove('overflow-hidden');
        inputTitle.value = ""
        inputDescription.value = ''
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden')
        }
    })


}