let currentPage = 1;
const resultsPerPage = 16;
const container = document.getElementById('book-info-container');
window.onload = function () {
  document.getElementById('search-input').value = 'javascript';
  searchBooks();
};
function searchBooks() {
  const apiKey = 'Enter your own api key'; 
  const searchQuery = document.getElementById('search-input').value.trim();

  if (searchQuery === '') {
    alert('Please enter a book name.');
    return;
  }

  const startIndex = (currentPage - 1) * resultsPerPage;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchQuery
  )}&key=${apiKey}&startIndex=${startIndex}&maxResults=${resultsPerPage}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById('book-info-container');
      container.innerHTML = '';

      if (data.items && data.items.length > 0) {
        data.items.forEach((item) => {
          const book = item.volumeInfo;
          createBookCard(book);
        });
      } else {
        container.innerHTML = '<p>No books found.</p>';
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function showBookDescription(book) {
  const modalTitle = document.getElementById('bookModalLabel');
  const modalBody = document.getElementById('bookModalBody');

  modalTitle.innerText = book.title || 'Book Description';
  modalBody.innerHTML = `
    <p><strong>Authors:</strong> ${book.authors?.join(', ') || 'Unknown'}</p>
    <p><strong>Publisher:</strong> ${book.publisher || 'Unknown'}</p>
    <p><strong>Published Date:</strong> ${book.publishedDate || 'Unknown'}</p>
    <p><strong>Description:</strong> ${book.description || 'No description available.'}</p>
  `;

  $('#bookModal').modal('show');
}

function createBookCard(book) {
  const bookInfo = document.createElement('div');
  bookInfo.className = 'card';
  
    const heartIcon = document.createElement('i');
  heartIcon.className = 'fas fa-heart heart-icon';
  bookInfo.appendChild(heartIcon);
  heartIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    heartIcon.classList.toggle('red-heart');
    
  });

  bookInfo.addEventListener('click', function () {
    showBookDescription(book);
  });
  const bookImage = document.createElement('img');
  bookImage.src = book.imageLinks?.thumbnail || 'no-image.png';
  bookImage.className = 'card-img-top';
  bookInfo.appendChild(bookImage);

  const bookDetails = document.createElement('div');
  bookDetails.className = 'card-body';
  bookDetails.innerHTML = `
    <h5 class="card-title">${book.title || 'Unknown'}</h5>
    <p class="card-text"><strong>Authors:</strong> ${book.authors?.join(', ') || 'Unknown'}</p>
    <p class="card-text"><strong>Publisher:</strong> ${book.publisher || 'Unknown'}</p>
    <p class="card-text"><strong>Published Date:</strong> ${book.publishedDate || 'Unknown'}</p>
  `;
  bookInfo.appendChild(bookDetails);

  container.appendChild(bookInfo);
  bookInfo.addEventListener('click', function () {
    showBookDescription(book);
  });
}

function nextPage() {
  currentPage++;
  searchBooks();
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    searchBooks();
  }
}

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) { 
    document.querySelector(".search").click();
  }
 
});
