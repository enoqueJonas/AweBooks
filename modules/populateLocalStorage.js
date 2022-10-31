export const populateLocalStorage = () => {
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
  