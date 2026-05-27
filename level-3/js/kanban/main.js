import { renderCards, createCard } from "./cards.js";
import { modal } from "./modal.js";
import { drag, dropCardPlace } from "./drag.js";

const todoWrapper = document.querySelector("#todo-cards-wrapper");
const inprogressWrapper = document.querySelector("#inprogress-cards-wrapper");
const doneWrapper = document.querySelector("#done-cards-wrapper");

function initMain() {
    renderCards()
    modal();
    dropCardPlace(todoWrapper, 'todo')
    dropCardPlace(inprogressWrapper, 'inprogress')
    dropCardPlace(doneWrapper, 'done')
}

document.addEventListener('DOMContentLoaded', initMain)
