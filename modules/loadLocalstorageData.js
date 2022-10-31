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
}

export const loadLocalstorageData = (booksLocalStorageObj) => {
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