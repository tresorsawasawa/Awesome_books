const listOutput = document.getElementById('lsOutput');

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('Books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('Books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('Books', JSON.stringify(books));
  }

  static removeBook(id) {
    let books = Store.getBooks();
    const updatedBooks = books.filter((book) => book.id !== parseInt(id, 10));
    books = updatedBooks;
    localStorage.setItem('Books', JSON.stringify(books));
  }
}

class Book {
  constructor(title, author) {
    this.id = new Date().valueOf();
    this.title = title;
    this.author = author;
  }
}
class UI {
  static displayBook() {
    const bookList = Store.getBooks();
    bookList.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    listOutput.innerHTML += `<div class="book" id="${book.id}">
                             <div class="book-infos">
                                <span>${book.title}</span>  <span>by</span>
                                <span>${book.author}</span>
                                <button class="removeBtn" >Delete</button>
                              </div>
                            </div>
                            `;
  }

  static deleteBook(id) {
    const el = document.getElementById(`${id}`);
    el.parentNode.removeChild(el);
  }
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.title.value === '' || e.target.author.value === '') {
    alert('Input field cannot be empty');
  } else {
    const author = e.target.author.value.trim();
    const title = e.target.title.value.trim();
    const newBook = new Book(author, title);
    Store.addBook(newBook);
    UI.addBookToList(newBook);
    e.target.reset();
  }
});

listOutput.addEventListener('click', (e) => {
  UI.deleteBook(e.target.parentElement.id);
  Store.removeBook(e.target.parentElement.id);
});

UI.displayBook();
