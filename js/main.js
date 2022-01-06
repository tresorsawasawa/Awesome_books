const listOutput = document.getElementById('lsOutput');

class Book {
  constructor(title, author) {
    this.id = new Date().valueOf();
    this.title = title;
    this.author = author;
  }
}

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

class UI {
  static displayBook() {
    const bookList = Store.getBooks();
    bookList.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    listOutput.innerHTML += `<div class="book" id="${book.id}">
                                <span class="item1 capitalize">"${book.title}"</span>
                                <span class="small">by</span>
                                <span class="item3 capitalize">${book.author}</span>
                                <button class="removeBtn clickable" >Delete</button>
                              </div>
                            `;
  }

  static deleteBook(id) {
    const el = document.getElementById(`${id}`);
    el.parentNode.removeChild(el);
  }
}

class Layout {
  constructor() {
    this.app = document.getElementById('app');
    this.app.classList.add('layout');

    this.header = document.createElement('header');
    this.header.setAttribute('id', 'header');
    this.header.classList.add('header');
    this.header.innerHTML = `<nav class="navbar px-3">
                               <div class="page-title">
                                 <a data-target="#" class="page-title text-white">Awesome Book</a>
                               </div>
                               <ul class="nav-list d-flex mt-3">
                                 <li class="nav-item " >
                                   <a href="#" class="ps-3 text-white">List</a>
                                 </li>
                                 <li class="nav-item" >
                                   <a href="#" class="ps-3 text-white">Add Book</a>
                                 </li>
                                 <li class="nav-item" >
                                   <a href="#" class="ps-3 text-white">Contact</a>
                                 </li>
                               </ul>
                             </nav>`;

    this.main = document.createElement('main');
    this.main.classList.add('main-container', 'flex');

    this.bookList = document.createElement('div');
    this.bookList.classList.add('book-list', 'flex-center-column');
    this.bookList.innerHTML = `<div class="list-title">
                                  <h3 class="fw-bold fs-4 pb-4 flex-center-column">Book List</h3>
                                </div>
                                <div id="lsOutput" class="lsOutput list-output w-100 rounded"></div>`;

    this.NewBookForm = document.createElement('form');
    this.NewBookForm.classList.add('form', 'flex-center-column', 'w-100', 'p-5');
    this.NewBookForm.innerHTML = `<div class="form-title flex-center-column">
                                    <h3 class="fw-bold fs-4 w-100 pb-4 flex-center-column">Add New Book</h3>
                                  </div>
                                  <div class="form-group w-50">
                                    <input type="text" id ="title" class="form-control input-text w-100 shadow-none" placeholder="Enter Book Title">
                                  </div>
                                  <div class="form-group w-50">
                                    <input type="text" id ="author" class="form-control input-text w-100 shadow-none" placeholder="Enter Book Author">
                                  </div>
                                  <input type="submit" class="btn btn-success px-5 clickable mt-4" value="Add Book" id="insertBtn">`;

    this.contactInfos = document.createElement('div');
    this.contactInfos.classList.add('contanctContainer', 'w-100', 'flex-center-column');
    this.contactInfos.setAttribute('id', 'contact');
    this.contactInfos.innerHTML = `<div class="contactBox w-75 p-4">
                                     <div class="p-4 w-100 contact-title flex-center-column">
                                       <h3 class="fw-bold fs-4 w-100 flex-center-column position-relative">Contact Informarions</h3>
                                     </div>
                                     <p>Do you have any question or you just want to say <span class="fw-bolder">'Hello!'</span><p/>
                                     <p class="py">You can reach out to us!</p>
                                     <ul class="list-group pt-3">
                                       <li class="list-group-item">Our e-mail: mail@gmail.com</li>
                                       <li class="list-group-item">Our Phone number: 0043729136280 </li>
                                       <li class="list-group-item">Our address: streetname 22, 84503 city, country</li>
                                     </ul>
                                   </div>`;

    this.footer = document.createElement('footer');
    this.footer.setAttribute(
      'id',
      'footer',
      'position-fixed',
      'bottom-0',
      'w-100',
    );
    this.footer.classList.add('footer');
    this.footer.innerHTML = `<div class="copyright py-3 text-end me-3">
                               <p class="h6 text-white">&copy;2022, <span class="h6">AwesomeBooks</span> </p>
                             </div>`;

    this.app.append(this.header, this.main, this.footer);
    this.main.append(this.bookList, this.NewBookForm, this.contactInfos);
  }

  update() {
    UI.displayBook();
  }
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.title.value === '' || e.target.author.value === '') {
    alert('Input field cannot be empty');
  } else {
    const author = e.target.author.value.trim();
    const title = e.target.title.value.trim();
    const newBook = new Book(title, author);
    Store.addBook(newBook);
    UI.addBookToList(newBook);
    e.target.reset();
  }
});

const layout = new Layout();
layout.update();

listOutput.addEventListener('click', (e) => {
  UI.deleteBook(e.target.parentElement.id);
  Store.removeBook(e.target.parentElement.id);
});