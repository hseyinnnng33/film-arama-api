const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// API URL = popüler filmleri sıralar ilk açılışta
// İMG_PATH = GÖRSELLERİ 1280 WİDTH ALMASINI SAGLAR
// SEARCH_API = FİLM ARAMAMIZI SAGLAR

const main = document.getElementById('main')
const form = document.getElementById('form')
const input = document.getElementById('search')

getMovie(API_URL)

async function getMovie(url){
    const res = await fetch(url)
    const data = await res.json()
    showMovie(data.results)
}


function showMovie(movies){
    main.innerHTML = "";

    movies.forEach((movie)=>{
        const title = movie.title;
        const poster_path = movie.poster_path;
        const vote_average = movie.vote_average;
        const overview = movie.overview;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.insertAdjacentHTML("beforeend",`
        <img src = "${IMG_PATH + poster_path}" alt = ${title}>
        <div class = "movie-info">
        <h3>${title}</h3>
        <span class = "${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class = "overview">
        <h3>Overview</h3>
        ${overview};
        </div>
        `)
        main.appendChild(movieEl);
    })
}


function getClassByRate(vote){
    if(vote >= 7){
        return "green";
    }
    else if(vote >=5){
        return "orange";
    }
    else{
        return "red";
    }
}

const btn = document.querySelector(".btn")

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const searchinput = input.value;

    if(searchinput && searchinput !== " "){
        getMovie(SEARCH_API + searchinput)
        input.innerHTML = "";
    }
    else{
        window.location.reload();
        console.log("hata")
    }
})

btn.addEventListener("click", function(e){
    e.preventDefault();

    const searchinput = input.value;

    if(searchinput && searchinput !== " "){
        getMovie(SEARCH_API + searchinput)
        input.innerHTML = "";
    }
    else{
        window.location.reload();
        console.log("hata")
    }
})