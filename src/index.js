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
const cardAddPopup = document.querySelector('.popup_type_new-card');
const pageUserName = document.querySelector('.profile__title');
const pageUserJob = document.querySelector('.profile__description');
const formUserName = document.querySelector('.popup__input_type_name');
const formUserJob = document.querySelector('.popup__input_type_description');
const formPlaceName = document.querySelector('.popup__input_type_card-name');
const formPlaceLink = document.querySelector('.popup__input_type_url');
const scalePopup = document.querySelector('.popup_type_image');
const scalePopupImg = document.querySelector('.popup__image');
const scalePopupCaption = document.querySelector('.popup__caption');
const editForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];

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

function handleUserInfoFormSubmit(event) {
    event.preventDefault();
    pageUserName.textContent = formUserName.value;
    pageUserJob.textContent = formUserJob.value;
    closePopup(profileEditPopup);
}

function handleNewCardFormSubmit(event) {
    event.preventDefault();
    placesList.prepend(createCard({ name: formPlaceName.value, link: formPlaceLink.value }, deleteCard, likeCard, scaleImg));
    closePopup(cardAddPopup);
    newCardForm.reset(); 
}

profileAddBtn.addEventListener('click', function () {
    openPopup(cardAddPopup);
});

allPopups.forEach((elem) => {
    elem.addEventListener('click', handlePopupOverlay);
    elem.classList.add('popup_is-animated');
})

closePopupBtns.forEach((elem) => {
    const openedPopup = elem.closest('.popup');
    elem.addEventListener('click', () => closePopup(openedPopup));
})

editForm.addEventListener('submit', handleUserInfoFormSubmit);

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

