const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inserBooktBtn = document.getElementById('insertBtn');
const listOutput = document.getElementById('lsOutput');

const booklist = JSON.parse(localStorage.getItem('Books')) || [];

inserBooktBtn.onclick = () => {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  if (title === '' || author === '') {
    alert('Add any input');
  } else {
    const newBook = {
      title,
      author,
    };
    booklist.unshift(newBook);
    localStorage.setItem('Books', JSON.stringify(booklist));
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
};

// eslint-disable-next-line no-unused-vars
function removeBook(val) {
  const book = booklist.filter((data, i) => i !== val);
  localStorage.setItem('Books', JSON.stringify(book));
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}

for (let i = 0; i < booklist.length; i += 1) {
  const book = booklist[i];
  listOutput.innerHTML += `<div id="addBook" class="addBook">
                             <div class="space-btn">
                             <span">${'  '}</span>
                             <span class="book-info item1">"${book.title}"</span></br>
                             <span class="book-info item2">${book.author}</span></br>
                             <input type="submit" value="Remove" id="delBtn" onclick="removeBook(${i})">
                             </div>
                            <hr>
                          </div>`;
}

