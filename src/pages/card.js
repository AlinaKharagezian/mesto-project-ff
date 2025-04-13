const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCard, likeCard, scaleImg) {
    const content = cardTemplate.querySelector('.places__item').cloneNode(true);
    const titleCard = content.querySelector('.card__title');
    const linkCard = content.querySelector('.card__image');
    const deleteBtn = content.querySelector('.card__delete-button');
    const likeddBtn = content.querySelector('.card__like-button');

    titleCard.textContent = card.name;
    linkCard.src = card.link;
    linkCard.alt = card.name;

    linkCard.addEventListener('click', scaleImg);
    deleteBtn.addEventListener('click', deleteCard);
    likeddBtn.addEventListener('click', likeCard);

    return content;
};

function deleteCard(event) {
    const card = event.currentTarget;
    const cardContent = card.closest('.places__item');
    cardContent.remove();
};


function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}


export {createCard, deleteCard, likeCard};
