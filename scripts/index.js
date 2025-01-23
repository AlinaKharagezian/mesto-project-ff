const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCard) {
    const content = cardTemplate.querySelector('.places__item').cloneNode(true);
    const titleCard = content.querySelector('.card__title');
    const linkCard = content.querySelector('.card__image');
    const deleteBtn = content.querySelector('.card__delete-button');

    titleCard.textContent = card.name;
    linkCard.src = card.link;
    linkCard.alt = card.name;

    deleteBtn.addEventListener('click', deleteCard);

    return content;
}

function deleteCard(event){
    const card = event.currentTarget;
    const cardContent = card.closest('.places__item');
    cardContent.remove();
}

initialCards.forEach((elem) => {
    const cardContent = createCard(elem, deleteCard);
    placesList.append(cardContent);
});
