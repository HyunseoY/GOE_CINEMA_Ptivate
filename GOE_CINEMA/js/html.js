const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTY5OThlOWQ3MWIzMGMyNjA5NGIzMjAzMTU5YWRlMSIsInN1YiI6IjY0NzA4OTAxNzI2ZmIxMDBlMWMzMTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9aRWYGmmSO_w-LR_sSCNqaiyee3BBj_703_ymo46wzc',
  },
};

function fetchMovies(url) {
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      movies = response.results;
      displayMovies(movies);
    })
    .catch((err) => console.error(err));
}

// 영화 카드를 표시하는 함수
function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');

  movies.forEach((movie) => {
    const template = `<div class="movie" onclick="alert(${movie.id})">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                        <h2 class="movieName">${movie.title}</h2>
                        <p class="movieSum">${movie.overview}</p>
                        <p class="movieRate">평점 ${movie.vote_average}</p>
                      </div>`;

    moviesContainer.insertAdjacentHTML('beforeend', template);
  });
}

fetchMovies();

// 검색어 입력 시 호출되는 함수
function search() {
  const searchInput = document.getElementById('input');
  const searchText = searchInput.value;
  const moviesContainer = document.getElementById('movies');

  // 기존 영화 카드 삭제
  moviesContainer.innerHTML = ' ';

  const filteredMovies = searchFilter(searchText);
  displayMovies(filteredMovies);
}

// 검색어를 사용하여 영화를 필터링하는 함수
function searchFilter(search) {
  const searchKeywords = search.toLowerCase().split(' ').join('');
  return movies.filter((movie) => {
    const movieTitle = movie.title.toLowerCase().replace(/\s/g, '');
    return movieTitle.includes(searchKeywords);
  });
}

// 검색어 입력 이벤트를 감지하여 실시간으로 검색 실행
function handleSearchInput() {
  const searchInput = document.getElementById('input');
  searchInput.addEventListener('input', function () {
    search();
  });
}

handleSearchInput();

// 클릭 및 엔터 이벤트
document.getElementById('input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    search();
  }
});
document.getElementById('btn').addEventListener('click', function () {
  search();
});

// 버튼 클릭 시 맨 위로 이동
const topBtn = document.querySelector('.moveTopBtn');
topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
