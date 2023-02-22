// ? =============> Global ===============>
let detailsData = document.querySelector("#detailsData");
let id = new URLSearchParams(location.search).get("id");


// ! =============> When Start ===============>

getdata(id);


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



// ! =============> Functions ===============>

// ========== get data ==========
async function getdata(id){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9cfe733beemsh16d817fc7d3522bp14e570jsn10dd1e713bf6',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    let data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    let dataJson = await data.json();
    display(dataJson);
};

// ========== display ==========
function display(data){
    let result = "";
        result += `
        <div class="col-md-4">
        <figure>
           <img src="${data.thumbnail}" class="w-100" alt="details image" />
        </figure>
     </div>
     <div class="col-md-8">
     
        <div>
           <nav aria-label="breadcrumb">
              <ol class="breadcrumb" class="text-light">
                 <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
                 <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
              </ol>
           </nav>
     
           <h1>${data.title}</h1>
     
           <h3>About ${data.title}</h3>
           <p>${data.description}</p>
     
           
        </div>
     </div>`;

    detailsData.innerHTML = result;
    document.body.style.cssText = `
    background-image:url("${data.thumbnail.replace("thumbnail", "background")}");
    background-position:center;
    background-size:cover;`;

};

