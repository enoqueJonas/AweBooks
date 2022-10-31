// Getting the elements from the html page
import Book from './modules/Book.js';
import { addBookLink, contactBookLink, listBookLink } from './modules/routing.js';
import SettingBooks from './modules/SettingBooks.js';
import storageAvailable from './modules/storageAvailable.js';
import { DateTime } from './modules/luxon.js';

const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const btn = document.querySelector('#add-btn');
const listLink = document.querySelector('#list-link');
const addLink = document.querySelector('#add-link');
const contactLink = document.querySelector('#contact-link');
const dateP = document.querySelector('.date');
const now = DateTime.now();

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

function populateLocalStorage() {
  let title = '';
  let author = '';

  // Conditional statement to check if the <input> with #title id has text/ value
  if (inputTitle.value !== null) {
    title = inputTitle.value;
  }

  // Conditional statement to check if the <input> with #author id has text/ value
  if (inputAuthor.value !== null) {
    author = inputAuthor.value;
  }

  // Creating a new object that will hold the information we get from the input values
  const booksLocalStorageObj = new Book(title, author);

  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, we will set the object created above into the local storage
    localStorage.setItem('formData', JSON.stringify(booksLocalStorageObj));
  }
}

function loadLocalstorageData() {
  // Creating a new istance of booksLocalStorageObject with empty values
  let booksLocalStorageObj = new Book('', '');

  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, get the localStorage data and assing to the booksLocalStorageObj
    booksLocalStorageObj = JSON.parse(localStorage.getItem('formData'));
  }

  // Conditional to check if booksLocalStorageObj has data
  if (booksLocalStorageObj !== null) {
    // If the condition is true, load the data the the input elements
    inputTitle.value = booksLocalStorageObj.title;
    inputAuthor.value = booksLocalStorageObj.author;
  }
}

btn.addEventListener('click', () => {
  call.add(new Book(inputTitle.value, inputAuthor.value));
});

window.addEventListener('load', () => {
  dateP.innerHTML = now;
});
window.addEventListener('load', loadLocalstorageData);
inputTitle.addEventListener('input', populateLocalStorage);
inputAuthor.addEventListener('input', populateLocalStorage);