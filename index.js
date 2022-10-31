/* eslint-disable max-classes-per-file */
// Getting the elements from the html page
import { Book } from "./modules/Book.js";
import { addBookLink, contactBookLink, listBookLink } from "./modules/routing.js";
import { storageAvailable } from "./modules/storageAvailable.js";
import { SettingBooks } from "./modules/SettingBooks.js";
import { populateLocalStorage } from "./modules/populateLocalStorage.js";
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const btn = document.querySelector('#add-btn');
const listLink = document.querySelector('#list-link');
const addLink = document.querySelector('#add-link');
const contactLink = document.querySelector('#contact-link');

// Addinding a book class with a constructor that will hold the title and the author
addLink.addEventListener('click', addBookLink);

contactLink.addEventListener('click', contactBookLink);

listLink.addEventListener('click', listBookLink);


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

window.addEventListener('load', loadLocalstorageData);
inputTitle.addEventListener('input', populateLocalStorage);
inputAuthor.addEventListener('input', populateLocalStorage);