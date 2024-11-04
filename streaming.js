"use strict";
/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}

function changeBg() {
  const images = [
    'url("https://wallpapercg.com/media/ts_orig/12370.webp")',
    'url("https://wallpaperaccess.com/full/8825546.jpg")',
    'url("https://images6.alphacoders.com/115/1159898.jpg")',
    'url("https://wallpapers.com/images/hd/deadpool-digital-movie-cover-s5l2oyuqd8nngufh.jpg")',
    'url("https://images6.alphacoders.com/104/1045970.jpg")',
    'url("https://wallpapercave.com/dwp2x/wp4598607.jpg")',
    'url("https://4kwallpapers.com/images/walls/thumbs_3t/11990.jpeg")',
  ];
  const section = document.querySelector(".hero");
  const bg = images[Math.floor(Math.random() * images.length)];
  section.style.backgroundImage = bg;
}
setInterval(changeBg, 3000);

/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10
    ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  window.scrollY >= 500
    ? goTopBtn.classList.add("active")
    : goTopBtn.classList.remove("active");
});

///------loading
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=22aefd69
// details: http://www.omdbapi.com/?i=tt3896198&apikey=22aefd69

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=22aefd69`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < 5; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    let moviePoster;
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}
let movieDetails = {};
// function loadMovieDetails() {
//   const searchListMovies = searchList.querySelectorAll(".search-list-item");
//   searchListMovies.forEach((movie) => {
//     movie.addEventListener("click", async () => {
//       // console.log(movie.dataset.id);
//       searchList.classList.add("hide-search-list");
//       movieSearchBox.value = "";
//       const result = await fetch(
//         `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=22aefd69`
//       );
//       movieDetails = await result.json();
//       // console.log(movieDetails);

//       displayMovieDetails(movieDetails);
//     });
//   });
// }
function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=22aefd69`
      );
      movieDetails = await result.json();

      // Open the movie-details.html page with movie details
      const newWindow = window.open("movie-details.html", "_blank");
      newWindow.onload = function () {
        // Pass movie details to the second page
        const title = newWindow.document.querySelector(".detail-title");
        title.textContent = movieDetails.Title;

        const thumbnailmovi =
          newWindow.document.getElementById("mov-thumbnail");
        thumbnailmovi.setAttribute("src", movieDetails.Poster);

        const year = newWindow.document.querySelector(".t-1");
        year.textContent = movieDetails.Year;

        const time = newWindow.document.querySelector(".t-2");
        time.textContent = movieDetails.Runtime;

        const genre = newWindow.document.querySelector(".ganre-wrapper");
        genre.textContent = movieDetails.Genre;

        const summary = newWindow.document.querySelector(".storyline");
        summary.textContent = movieDetails.Plot;

        const tt = newWindow.document.querySelector("title");
        tt.textContent = `${movieDetails.Title}  ||  Filmysite`;
        // console.log(movieDetails);
      };
    });
  });
}

window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
