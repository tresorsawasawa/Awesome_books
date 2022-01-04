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