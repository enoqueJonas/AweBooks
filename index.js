/* eslint-disable max-classes-per-file */
// Getting the elements from the html page
import Book from './modules/Book.js';
import { addBookLink, contactBookLink, listBookLink } from './modules/routing.js';
import SettingBooks from './modules/SettingBooks.js';
import populateLocalStorage from './modules/populateLocalStorage.js';
import loadLocalstorageData from './modules/loadLocalstorageData.js';

const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const btn = document.querySelector('#add-btn');
const listLink = document.querySelector('#list-link');
const addLink = document.querySelector('#add-link');
const contactLink = document.querySelector('#contact-link');

// Addinding a book class with a constructor that will hold the title and the author
addLink.addEventListener('click', addBookLink);

contactLink.addEventListener('click', listBookLink);

listLink.addEventListener('click', contactBookLink);

const call = new SettingBooks();
if (localStorage.getItem('bookItems')) {
  const localBooks = JSON.parse(localStorage.getItem('bookItems'));
  localBooks.bookColl.forEach((item) => {
    call.add(new Book(item.title, item.author));
  });
}

btn.addEventListener('click', () => {
  call.add(new Book(inputTitle.value, inputAuthor.value));
});

const book = new Book('', '');
window.addEventListener('load', loadLocalstorageData(book));
inputTitle.addEventListener('input', populateLocalStorage(book));
inputAuthor.addEventListener('input', populateLocalStorage(book));