import initialCards from "./pages/cards";
import { createCard, deleteCard, likeCard } from './pages/card';
import { openPopup, closePopup,  handlePopupOverlay } from './pages/modal';
import './pages/index.css';

const placesList = document.querySelector('.places__list');
const allPopups = document.querySelectorAll('.popup');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const closePopupBtns = document.querySelectorAll('.popup__close');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const pageUserName = document.querySelector('.profile__title');
const pageUserJob = document.querySelector('.profile__description');
const formUserName = document.querySelector('.popup__input_type_name');
const formUserJob = document.querySelector('.popup__input_type_description');
const formPlaceName = document.querySelector('.popup__input_type_card-name');
const formPlaceLink = document.querySelector('.popup__input_type_url');
const scalePopup = document.querySelector('.popup_type_image');
const scalePopupImg = document.querySelector('.popup__image');
const scalePopupCaption = document.querySelector('.popup__caption');


function scaleImg(event) {
    scalePopupImg.src = event.target.src;
    scalePopupImg.alt = event.target.alt;
    scalePopupCaption.textContent = event.target.alt;
    openPopup(scalePopup);
}

initialCards.forEach((elem) => {
    const cardContent = createCard(elem, deleteCard, likeCard, scaleImg);
    placesList.append(cardContent);
});

profileEditBtn.addEventListener('click', function () {
    formUserName.value = pageUserName.textContent;
    formUserJob.value = pageUserJob.textContent;
    openPopup(profileEditPopup);
});

function handleFormSubmit(event) {
    event.preventDefault();
    pageUserName.textContent = formUserName.value;
    pageUserJob.textContent = formUserJob.value;
    const openedPopup = event.target.closest('.popup_is-opened');
    closePopup(openedPopup);
}

function handleCardSubmit(event) {
    event.preventDefault();
    placesList.prepend(createCard({ name: formPlaceName.value, link: formPlaceLink.value }, deleteCard, likeCard, scaleImg));
    const openedPopup = event.target.closest('.popup_is-opened');
    closePopup(openedPopup);
    const form = openedPopup.querySelector('.popup__form');
    form.reset(); 
}

profileAddBtn.addEventListener('click', function () {
    openPopup(profileAddPopup);
});

allPopups.forEach((elem) => {
    elem.addEventListener('click', handlePopupOverlay);
})

closePopupBtns.forEach((elem) => {
    const openedPopup = elem.closest('.popup');
    elem.addEventListener('click', () => closePopup(openedPopup));
})

profileEditPopup.addEventListener('submit', handleFormSubmit);

profileAddPopup.addEventListener('submit', handleCardSubmit);

allPopups.forEach((elem) => {
    elem.classList.add('popup_is-animated');
});

