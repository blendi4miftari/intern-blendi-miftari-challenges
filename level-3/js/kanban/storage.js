

function getCardsFromLocalStorage() {
    if (localStorage.getItem('cards') !== null) {
        return JSON.parse(localStorage.getItem('cards'));
    } else {
        return [];
    }
}

function saveCardOnLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
}


export {getCardsFromLocalStorage, saveCardOnLocalStorage}
