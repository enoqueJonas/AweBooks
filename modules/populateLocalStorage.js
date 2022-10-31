const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');

const storageAvailable = (type) => {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
          // Firefox
          || e.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || e.name === 'QuotaExceededError'
          // Firefox
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
          // acknowledge QuotaExceededError only if there's something already stored
          && (storage && storage.length !== 0);
  }
};

const populateLocalStorage = (booksLocalStorageObj) => {
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
  booksLocalStorageObj.title = title;
  booksLocalStorageObj.author = author;
  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, we will set the object created above into the local storage
    localStorage.setItem('formData', JSON.stringify(booksLocalStorageObj));
  }
};

export default populateLocalStorage;