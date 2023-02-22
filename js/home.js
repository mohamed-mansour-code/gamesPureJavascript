// ? =============> Global ===============>
let link = Array.from(document.querySelectorAll(".menu .nav-link"));
let loading = document.querySelector(".loading");

// ! =============> When Start ===============>
(async function(){
    linkActive();
    getGames("mmorpg");

    document.querySelector("#LogOut").addEventListener('click',()=>{
        localStorage.removeItem("token");
        location.href = "./index.html";
    });

})();

// ========== mode ==========
if(localStorage.getItem("mode") !== null){
    document.documentElement.setAttribute("data-theme",localStorage.getItem("mode"));
 }
 document.querySelector("#mode").addEventListener('click',()=>{
    if(document.documentElement.getAttribute("data-theme") == "dark"){
        document.documentElement.setAttribute("data-theme","light");
        localStorage.setItem("mode" , "light");
    }else{
        document.documentElement.setAttribute("data-theme","dark");
        localStorage.setItem("mode" , "dark");
    }
 });

// * =============> Events ===============>

// ! =============> Functions ===============>
function linkActive(){
    link.forEach((x)=>{
        x.addEventListener('click',(e)=>{
            document.querySelector(".menu .active").classList.remove("active");
            e.target.classList.add("active");
            getGames(e.target.getAttribute("data-category"));
        });
    });
};

//========= get data =========
async function getGames(name){
    
    loading.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9cfe733beemsh16d817fc7d3522bp14e570jsn10dd1e713bf6',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${name}`,options);
    let dataJson = await data.json();
    display(dataJson);
    loading.classList.add("d-none");

};

//========= display data =========

function display(gamesData){
    var result = "";
    for(i=0 ; i<gamesData.length ; i++){
        result += `<div class="col">
        <div class="card h-100 bg-transparent" role="button"  id="${gamesData[i].id}" >
           <div class="card-body">
  
              <figure class="position-relative">
                 <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />
  
               <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                <source src="${gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm")}">
                </video>
  
              </figure>
  
              <figcaption>
  
                 <div class="hstack justify-content-between">
                    <h3 class="h6 small"> ${gamesData[i].title} </h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                 </div>
  
                 <p class="card-text small text-center opacity-50">
                    ${gamesData[i].short_description}
                 </p>
  
              </figcaption>
           </div>
  
           <footer class="card-footer small hstack justify-content-between">
  
              <span class="badge badge-color">${gamesData[i].genre}</span>
              <span class="badge badge-color">${gamesData[i].platform}</span>
  
           </footer>
        </div>
     </div>`;
    }
    document.querySelector(".home .row").innerHTML = result;
    mouseEnter();
    mouseleave();
    details();
};

//========= box hover in =========
function mouseEnter(){
    let cards = document.querySelectorAll(".row .col .card");
    cards.forEach((x)=>{
        x.addEventListener('mouseenter',(e)=>{
            let elemet = e.target.querySelector("video");
            elemet.classList.remove("d-none");
            elemet.muted = true;
            elemet.play();
     });
    });
}


//========= box hover out =========
function mouseleave(){
    let cards = document.querySelectorAll(".row .col .card");
    cards.forEach((x)=>{
        x.addEventListener('mouseleave',(e)=>{
            let elemet = e.target.querySelector("video");
            elemet.classList.add("d-none");
            elemet.muted = true;
            elemet.pause();
     });
    });
};


//========= detail =========
function details(){
    let cards = document.querySelectorAll(".row .col .card");
    cards.forEach((x)=>{
        x.addEventListener('click',(e)=>{
            location.href = `./details.html?id=${x.getAttribute("id")}`;
     });
    });
};

