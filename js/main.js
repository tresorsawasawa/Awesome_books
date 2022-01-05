const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inserBooktBtn = document.getElementById('insertBtn');
const listOutput = document.getElementById('lsOutput');

const booklist = JSON.parse(localStorage.getItem('Books')) || [];

inserBooktBtn.onclick = () => {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  if (title === '' || author === '') {
    alert('Inputs cannot be empty');
  } else {
    const newBook = {
      title,
      author,
    };
    booklist.unshift(newBook);
    localStorage.setItem('Books', JSON.stringify(booklist));
    location.reload();
  }
};

function removeBook(val) {
  const book = booklist.filter((data, i) => i !== val);
  localStorage.setItem('Books', JSON.stringify(book));
  location.reload();
}

for (let i = 0; i < booklist.length; i += 1) {
  const book = booklist[i];
  listOutput.innerHTML += `<div id="addBook" class="addBook">
                              <span">${'  '}</span>
                              <span class="book-info item1">"${book.title}"</span></br>
                              <span class="book-info item2">${book.author}</span></br>
                              <input type="submit" class="bttn" value="Remove" id="delBtn" onclick="removeBook(${i})">
                              <hr>
                          </div>`;
}

class Store {}
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
}

listOutput.addEventListener('click', (e) => {
  UI.deleteBook(e.target.parentElement.id);
  Store.removeBook(e.target.parentElement.id);
});

UI.displayBook();
