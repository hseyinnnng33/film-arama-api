const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// API URL = popüler filmleri sıralar ilk açılışta
// İMG_PATH = GÖRSELLERİ 1280 WİDTH ALMASINI SAGLAR
// SEARCH_API = FİLM ARAMAMIZI SAGLAR

const main = document.getElementById('main')
const form = document.getElementById('form')
const input = document.getElementById('search')

acilisFilm(API_URL) // sayfa ilk açıldıgında göstermesi için

// ve film aratması için kullanıyoruz
async function acilisFilm(url){
    const data = await fetch(url) // burada api çektik
    const goster = await data.json(); // json verilerini gostere attık
    // console.log(goster.results)

    if(goster.results.length == 0){
        hataFilm()
    }
    else{
        filmgoster(goster.results)

    }
}

function hataFilm(){
    main.innerHTML = `<div class= "error"> 
    <div>
    🫠Galiba İstedigini Bulamadık Bir Daha Deneyelim
    <img src = "resim.webp">
    ${setInterval(() => {
        window.location.reload();
    }, 4000)}
    </div>
    </div>`
}

function filmgoster(film){
    main.innerHTML= ""; // main in boş kalması için

    // aldıgımız json ı döngüye soktuk
    film.forEach((filmler)=>{
        const baslik_title = filmler.title;
        const reyting_average = filmler.vote_average;
        const kapak_path = filmler.poster_path;
        const aciklama_overview = filmler.overview;

        const filmlerKart = document.createElement("div");
        filmlerKart.classList.add("movie");

        filmlerKart.insertAdjacentHTML("beforeend", `
        <img src = "${IMG_PATH + kapak_path}" alt=${baslik_title}>
        <div class = "movie-info">
        <h3>${baslik_title}</h3>
        <span class="${reyting(reyting_average)}">${reyting_average}</span>
        </div>
        <div class ="overview">
        <h3>${aciklama_overview}</h3>
        </div>
        `)
        main.appendChild(filmlerKart);
    })
}

// reyting oranlarına göre renk veriyoruz
function reyting(oran){
    if(oran >= 7){
        return "green";
    }
    else if(oran > 5){
        return "orange";
    }
    else{
        return "red";
    }
}

const btn = document.querySelector(".btn");

form.addEventListener("submit", function(e){
    e.preventDefault();
    let inputValue = input.value;

    if(inputValue && inputValue !== " "){
        acilisFilm(SEARCH_API + inputValue);
        input.value = " ";
    }
    else{
        window.location.reload();
    }
})

btn.addEventListener("click", function(e){
    e.preventDefault();
    let inputValue = input.value;
    
    if(inputValue && inputValue !== " "){
        acilisFilm(SEARCH_API + inputValue);
        input.value = "";
    }
    else{
        window.location.reload();
    }
})
