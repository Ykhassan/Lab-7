// grab all buttons

const xhrSearch = document.getElementById("xhrSearch");
const fetchSearch = document.getElementById("fetchSearch");
const fetchWithAwaitAsyncSearch = document.getElementById("fetchWithAwait-Async");

const searchQuery = document.getElementById("searchQuery");
const url = "https://api.unsplash.com/search/photos/";
const accessKey = "BH2hngMWuMXetjP3i5HT5cdPKebbo2i7EriFEO8bIcc";

// search using XHR

fetchSearch.addEventListener("click", () => {
    searchFetch()
})

fetchWithAwaitAsyncSearch.addEventListener("click", () => {
    searchFetchWithAwaitAsync();
})

xhrSearch.addEventListener("click", () => {
    searchXHR();
})

function searchXHR(){
    let query = searchQuery.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
    if(xhr.status === 200 && xhr.readyState === 4){
        let response = JSON.parse(xhr.responseText);
        populateImages(response);
    } 
    }
    xhr.open("GET", url + `?query=${query}`, true);
    xhr.setRequestHeader("Authorization", "Client-ID " + accessKey);
    xhr.send();
}

function searchFetch(){
    let query = searchQuery.value.trim();
    fetch(url+`?query=${query}`, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    }).then((response) => {
        return response.json();
    }).then((data)=>{
        populateImages(data);
    })
    .catch((msg) => {
        console.log(msg);
    })
}

async function searchFetchWithAwaitAsync() {
    let query = searchQuery.value.trim();
    let response = await fetch(url+`?query=${query}`, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    }
    )
    if (response.ok){
    populateImages(await response.json());
    }
}
function populateImages (data){
    const results = document.getElementById("results");      
    results.innerHTML = "";
    data.results.forEach(element => {
        let img = document.createElement("img");
        img.src = element.urls.small;
        img.alt = element.alt_description;
        results.appendChild(img);
    });
}

