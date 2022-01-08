/* eslint class-methods-use-this: ["error", { "exceptMethods": ["changeContent", "update"] }] */

const date = window.luxon;

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
    const listOutput = document.querySelector('.lsOutput');
    listOutput.innerHTML += `<div class="book rounded" id="${book.id}">
                                <span class="p-2 fw-bolder item1 text-capitalize">"${book.title}"</span>
                                <span class="p-2">by</span>
                                <span class="p-2 item3 text-capitalize">${book.author}</span>
                                <button class="position-absolute h5 py-1 px-4 removeBtn clickable rounded end-0 bottom-0" >Delete</button>
                              </div>
                            `;
  }

  static deleteBook(id) {
    const el = document.getElementById(`${id}`);
    el.parentNode.removeChild(el);
  }
}
class Navigation {
  constructor() {
    this.navs = document.querySelectorAll('[href]');
  }

  init() {
    this.navs.forEach((nav) => {
      nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          this.changeTabs(e);
          this.changeContent(e);
        }
      });
    });
  }

  changeTabs(e) {
    this.navs.forEach((nav) => nav.classList.remove('active'));
    e.target.classList.add('active');
  }

  changeContent(e) {
    document.querySelectorAll('.content-box').forEach((item) => {
      item.classList.remove('active');
    });
    const selector = e.target.getAttribute('href');
    const content = document.querySelector(selector);
    content.classList.add('active');
  }
}
class Layout {
  constructor() {
    this.app = document.getElementById('app');
    this.app.classList.add('layout');
    this.header = document.createElement('header');
    this.header.setAttribute('id', 'header');
    this.header.classList.add('header', 'position-fixed', 'top-0', 'w-100');
    this.header.innerHTML = `<nav class="navbar px-3">
                               <div class="page-title">
                                 <a href="#list" class="page-title text-white active">Awesome Book</a>
                               </div>
                               <span id="humburger"><i class="fa humburger fa-bars fa-2x humb-mob text-white d-none"></i></span>
                               <span id="humburger"><i class="fa humburger fa-times fa-2x humb-mob text-white d-none"></i></span>
                               <ul class="nav-list mt-3">
                                 <li id="position-relative" >
                                   <span class="active-navlink"></span>
                                 </li>
                                 <li class="nav-item " >
                                   <a href="#list" class="ps-3 text-white navLink active">List</a>
                                 </li>
                                 <li class="nav-item" >
                                   <a href="#form" class="ps-3 text-white navLink">Add Book</a>
                                 </li>
                                 <li class="nav-item" >
                                   <a href="#contact" class="ps-3 text-white navLink">Contact</a>
                                 </li>
                               </ul>
                             </nav>`;

    const today = date.DateTime.local();
    this.time = document.createElement('div');
    this.time.classList.add('clock', 'mt-5');
    this.time.innerHTML = `<p class='pt-4 text-end me-2'>
                             ${today.toFormat('FFF')}
                           </p>
                           `;
    this.main = document.createElement('main');
    this.main.classList.add('main-container');
    this.bookList = document.createElement('div');
    this.bookList.id = 'list';
    this.bookList.classList.add(
      'content',
      'book-list',
      'active',
      'content-box',
      'pt-2',
    );
    this.bookList.innerHTML = `<div class="list-title">
                                  <h3 class="fw-bold fs-4 pb-4 flex-center-column">Book List</h3>
                                </div>
                                <div id="lsOutput" class="lsOutput list-output w-100 rounded"></div>`;
    this.NewBookForm = document.createElement('form');
    this.NewBookForm.id = 'form';
    this.NewBookForm.classList.add(
      'content',
      'form',
      'content-box',
      'w-100',
    );
    this.NewBookForm.innerHTML = `<div class="form-title flex-center-column pt-3">
                                    <h3 class="fw-bold fs-4 w-100 pt-2 pb-2 flex-center-column">Add New Book</h3>
                                  </div>
                                  <p id="addMsg" class="text-center text-success"></p>
                                  <div class="form-group w-50">
                                    <input type="text" id ="title" class="form-control input-text w-100 shadow-none" placeholder="Enter Book Title">
                                  </div>
                                  <div class="form-group w-50">
                                    <input type="text" id ="author" class="form-control input-text w-100 shadow-none" placeholder="Enter Book Author">
                                  </div>
                                  <div class="delete-btn text-center">
                                    <input type="submit" class="btn btn-success px-5 clickable mt-4" value="Add Book" id="insertBtn">
                                  </div>
                                  `;
    this.contactInfos = document.createElement('div');
    this.contactInfos.classList.add(
      'w-100',
      'text-center',
      'content-box',
      'content',
      'pt-5',
    );
    this.contactInfos.setAttribute('id', 'contact');
    this.contactInfos.classList.add('contact');
    this.contactInfos.innerHTML = `<div class="flex-center-column contactBox w-75 p-1">
                                     <div class="pb-2 w-100 contact-title flex-center-column">
                                       <h3 class="fw-bold fs-4 w-100 flex-center-column position-relative">Contact Informarions</h3>
                                     </div>
                                     <p>Do you have any question or you just want to say <span class="fw-bolder">'Hello!'</span><p/>
                                     <p>You can reach out to us!</p>
                                     <ul class="list-group pt-2 text-start contact-list-container">
                                       <li class="list-group-item">Our e-mail:<span class="fw-bold"> mail@gmail.com </span></li>
                                       <li class="list-group-item">Our Phone number:<span class="fw-bold"> 0043729136280 </span></li>
                                       <li class="list-group-item">Our address:<span class="fw-bold"> streetname 22, 84503 city, country</span></li>
                                     </ul>
                                   </div>`;
    this.footer = document.createElement('footer');
    this.footer.setAttribute('id', 'footer');
    this.footer.classList.add(
      'footer',
      'position-fixed',
      'bottom-0',
      'w-100',
    );
    this.footer.innerHTML = `<div class="copyright py-3 text-end me-3">
                               <p class="h6 text-white">&copy;2022, <span class="h6">AwesomeBooks</span> </p>
                             </div>`;
    this.app.append(this.header, this.time, this.main, this.footer);
    this.main.append(this.bookList, this.NewBookForm, this.contactInfos);
  }

  update() {
    UI.displayBook();
    const nav = new Navigation();
    nav.init();
  }
}

function addedSuccess() {
  document.getElementById('addMsg').style = 'display:block';
  document.getElementById('addMsg').innerHTML = 'Book added successfully!!!';
  setTimeout(() => {
    document.getElementById('addMsg').style = 'display:none';
  }, 3000);
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
    document.querySelectorAll('.content').forEach((item) => {
      item.classList.remove('active');
    });
    const content = document.querySelector('#form');
    content.classList.add('active');
    addedSuccess();
  }
});
const layout = new Layout();
layout.update();
document.querySelector('.lsOutput').addEventListener('click', (e) => {
  const isButton = e.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  UI.deleteBook(e.target.parentElement.id);
  Store.removeBook(e.target.parentElement.id);
});