// This code will be responsible for handling routing

const booksSection = document.querySelector('.books-section');
const addBookSection = document.querySelector('.add-book-section');
const contactSection = document.querySelector('.contact-section');

export const addBookLink = () => {
  booksSection.classList.add('active');
  addBookSection.classList.add('active');
  contactSection.classList.remove('active');
};

export const listBookLink = () => {
  booksSection.classList.add('active');
  contactSection.classList.add('active');
  addBookSection.classList.remove('active');
};

export const contactBookLink = () => {
  booksSection.classList.remove('active');
  contactSection.classList.remove('active');
  addBookSection.classList.remove('active');
};