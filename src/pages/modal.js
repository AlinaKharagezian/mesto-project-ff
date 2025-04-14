function openPopup(elem) {
    elem.classList.add('popup_is-opened');
    document.addEventListener('keydown', handlePopupEsc);
}

function closePopup(elem) {
    elem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handlePopupEsc);
}

function handlePopupEsc(elem) {
    if (elem.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

function handlePopupOverlay(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

export {openPopup, closePopup, handlePopupEsc, handlePopupOverlay};

