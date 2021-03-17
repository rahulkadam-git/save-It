const auth = "563492ad6f91700001000001bde2677361b8478c9feef74514b677ce";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector("#search-inp");
const searchButton = document.querySelector(".submit-form");
let searchValue;
const more = document.querySelector(".more");
let page =1;
let fetchLink;
let currentSearch;
searchInput.addEventListener("input",updateInput);
searchButton.addEventListener("submit",(e)=>{
    e.preventDefault();
    currentSearch=searchValue;
    searchPhotos(searchValue);
    
});
more.addEventListener("click",loadMore);

function updateInput(e){
    searchValue = e.target.value;
   
}

async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method:"get",
        headers:{
            Accept:"application/json",
            authorization: auth
            }        
            });
const data = await dataFetch.json();
return data;
    
}

function generatePicture(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add('gallery-Img');
        galleryImg.innerHTML = `
        
        <img src=${photo.src.large}></img>
        
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <p>${photo.photographer_id}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        `;
        
         gallery.appendChild(galleryImg);
    });
}
async function curatedPhotos(){
    fetchLink="https://api.pexels.com/v1/curated?per_page=15&page=1";    
    const data = await fetchApi(fetchLink);
generatePicture(data);
}
 
async function searchPhotos(query){
clear();
fetchLink=`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
const data = await fetchApi(fetchLink);
generatePicture(data);
}


function clear(){
    gallery.innerHTML='';
    searchInput.value='';
}

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }else{
        fetchLink=`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }

const data =await fetchApi(fetchLink);
generatePicture(data);
}








curatedPhotos();