
import { updateCounter } from "./cards.js";
import { getCardsFromLocalStorage, saveCardOnLocalStorage } from "./storage.js";

let dragedCardId = null;

function drag(cardDiv) {
    cardDiv.addEventListener('dragstart', () => {
        dragedCardId = cardDiv.dataset.id
        cardDiv.classList.add('opacity-50')
    })

    cardDiv.addEventListener('dragend', () => {
        cardDiv.classList.remove('opacity-50')
    })
}

function dropCardPlace(column, status) {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    column.addEventListener('drop', () => {
        console.log('drop fired')
        console.log('draggedCardId:', dragedCardId)
        const cards = getCardsFromLocalStorage();
    
        const dragedCard = cards.find(card => card.id === Number(dragedCardId));
    console.log('found card:', dragedCard)
        dragedCard.status = status;
        console.log('new status:', dragedCard.status)
    
        saveCardOnLocalStorage(cards);
    
        column.appendChild(document.querySelector(`[data-id="${ dragedCardId }"]`))
        console.log('card element found:', column.appendChild(document.querySelector(`[data-id="${ dragedCardId }"]`)))
        
        updateCounter();
        
    })
}

export {dropCardPlace, drag}