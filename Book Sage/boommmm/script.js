const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultContainer');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    searchSpecies(searchTerm);
  }
});

function searchSpecies(searchTerm) {
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual EOL API key
  const apiUrl = `https://eol.org/api/search/1.0.json?q=${encodeURIComponent(searchTerm)}&key=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

function displayResults(data) {
  resultContainer.innerHTML = '';

  if (data.totalResults === 0) {
    resultContainer.innerHTML = '<p>No species found.</p>';
    return;
  }

  data.results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.innerHTML = `
      <h3>${result.title}</h3>
      <p>Taxon ID: ${result.id}</p>
      <p>${result.url}</p>
    `;
    resultContainer.appendChild(resultElement);
  });
}
