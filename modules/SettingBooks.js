const bookContainer = document.querySelector('.books-container');
const inputAuthor = document.querySelector('#author');
const inputTitle = document.querySelector('#title');

export class SettingBooks {
    // A constructor that will hold the books array
    constructor(books = []) {
        this.books = books;
    }

    // Add method to add a book to the books array
    add(bookItem) {
        this.books.push(bookItem);
        this.show(bookItem);
        this.remove();
        this.addToLocalStorage();
        inputAuthor.value = '';
        inputTitle.value = '';
    }

    // Remove method to remove a book from the books array
    remove() {
        const removeBtns = document.querySelectorAll('.remove-button');
        removeBtns[removeBtns.length - 1].addEventListener('click', (e) => {
            this.removeFromCollection(e.target);
            bookContainer.removeChild(e.target.parentNode);
        });
    }

    // This method will create new content in the html page
    show(item) {
        if (this) {
            const div = document.createElement('div');
            div.className = 'books books-items';
            div.innerHTML = `<h3 class="books-items">"${item.title}" by
                  ${item.author}</h3>
                  <button data-value="${item.title}-${item.author}" type="button" class ="remove-button">Remove</button>`;
            bookContainer.appendChild(div);
        }
    }

    removeFromCollection(item) {
        const arr = item.getAttribute('data-value').split('-');
        this.books = this.books.filter(
            (data) => data.title !== arr[0] && data.author !== arr[1],
        );
        this.addToLocalStorage();
    }

    // This method will add the book to the local storage
    addToLocalStorage() {
        localStorage.setItem('bookItems', JSON.stringify({ bookColl: this.books }));
    }
}
