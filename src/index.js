import { getUserData, getInitialCards, patchUserData, postNewCard, patchNewAvatar } from './pages/api'
import { openPopup, closePopup,  handlePopupOverlay } from './pages/modal';
import './pages/index.css';
import { createCard, likeCard, deleteCard } from "./pages/card";
import { selectors, clearValidation, enableValidation} from './pages/validation';

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
const profileAvatarPopup = document.querySelector('.popup_avatar_edit');
const profileAvatarPopupBtn = document.querySelector('.profile__avatar-edit-button');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarForm = document.forms['edit-avatar'];
const profileInput = profileAvatarForm.elements.link;
const editForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
let Id;


Promise.all([getUserData(), getInitialCards()])
    .then(([userInfo, cards]) => {
        pageUserName.textContent = userInfo.name;
        pageUserJob.textContent = userInfo.about;
        Id = userInfo._id;
        profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`
        cards.forEach((card) => {
            const cardContent = createCard(card, Id, deleteCard, likeCard, scaleImg);
            placesList.append(cardContent);
        });
    })
    .catch((err) => {
        console.log(err);
    }); 

function handleUserInfoFormSubmit(event) {
    event.preventDefault();
    const editFormBtn = editForm.querySelector('.popup__button');
    editFormBtn.textContent = 'Сохранение...'
    patchUserData(formUserName.value, formUserJob.value)
        .then((data => {
            pageUserName.textContent = data.name;
            pageUserJob.textContent = data.about;
            closePopup(profileEditPopup);
        }))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editFormBtn.textContent = 'Сохранено'
        })
        
}

function handleUserAvatarSubmit(event) {
    event.preventDefault();
    const profileAvatarFormBtn = profileAvatarForm.querySelector('.popup__button');
    profileAvatarFormBtn.textContent = 'Сохранение...'
    patchNewAvatar(profileInput.value)
        .then((data => {
            profileAvatar.style.backgroundImage = `url(${data.avatar})`;
            closePopup(profileAvatarPopup);
        }))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            profileAvatarFormBtn.textContent = 'Сохранено'
        })

}

function handleNewCardFormSubmit(event) {
    event.preventDefault();
    const newCardFormBtn = newCardForm.querySelector('.popup__button');
    newCardFormBtn.textContent = 'Сохранение...'
    postNewCard(formPlaceName.value, formPlaceLink.value)
        .then((card => {
            placesList.prepend(createCard(card, Id, deleteCard, likeCard, scaleImg));
            closePopup(cardAddPopup);
            newCardForm.reset();
        }))
        .catch((err) => {
            console.log(err); 
        })
        .finally(() => {
            newCardFormBtn.textContent = 'Сохранить'
        })
}

function scaleImg(event) {
    scalePopupImg.src = event.target.src;
    scalePopupImg.alt = event.target.alt;
    scalePopupCaption.textContent = event.target.alt;
    openPopup(scalePopup);
}

profileAvatarPopupBtn.addEventListener('click', function () {
    openPopup(profileAvatarPopup);
    clearValidation(profileAvatarForm, selectors);
});

profileEditBtn.addEventListener('click', function () {
    clearValidation(profileEditPopup, selectors);
    formUserName.value = pageUserName.textContent;
    formUserJob.value = pageUserJob.textContent;
    openPopup(profileEditPopup);
});

profileAddBtn.addEventListener('click', function () {
    openPopup(cardAddPopup);
    clearValidation(cardAddPopup, selectors);
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

profileAvatarForm.addEventListener('submit', handleUserAvatarSubmit);

enableValidation(selectors);