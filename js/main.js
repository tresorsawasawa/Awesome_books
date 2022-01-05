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
UI.displayBook();
