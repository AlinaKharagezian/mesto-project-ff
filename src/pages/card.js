import { deleteCardContent, putCardLIke, deleteCardLIke } from './api'
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, userId, deleteCard, likeCard, scaleImg) {
    const content = cardTemplate.querySelector('.places__item').cloneNode(true);
    const titleCard = content.querySelector('.card__title');
    const linkCard = content.querySelector('.card__image');
    const deleteBtn = content.querySelector('.card__delete-button');
    const likeddBtn = content.querySelector('.card__like-button');
    const likeNumber = content.querySelector('.card__likes-number');

    const isLikedByUserId = card.likes.some(like => like._id === userId);

    if (isLikedByUserId) {
        likeddBtn.classList.add('card__like-button_is-active');
    }

    if (card.owner._id === userId) {
        deleteBtn.addEventListener('click', () => deleteCard(content, card._id));
    }
    else {
        deleteBtn.style.display = 'none';
    }

    titleCard.textContent = card.name;
    linkCard.src = card.link;
    linkCard.alt = card.name;
    likeNumber.textContent = card.likes.length;

    linkCard.addEventListener('click', scaleImg);
    likeddBtn.addEventListener('click', () => {
        likeCard(likeddBtn, card._id, likeNumber)
    });

    return content;
};

function deleteCard(card, cardId) {
    deleteCardContent(cardId)
    .then(res => {
        card.remove();
    })
    .catch((err) => {
        console.log(err);
    });
};


function likeCard(btn, cardId, likesNumber) {
    const isLiked = btn.classList.contains('card__like-button_is-active');
    const toggleLIke = isLiked ? deleteCardLIke(cardId) : putCardLIke(cardId);

    toggleLIke.then(res => {
        btn.classList.toggle('card__like-button_is-active');
        likesNumber.textContent = res.likes.length;
    })
    .catch((err) => {
        console.log(err); 
    });
}

export {createCard, likeCard, deleteCard}