var unsplashUrl = "https://api.unsplash.com/photos/random";
var unsplashKey = "?client_id="

// Anthony's API key: Y7VECVD09iDrQAy00Es7pzryAq1eJHAavoD0b01THRU
// Nhi's API key: c-IjSlno3hcniLXjGjNLHmA1cCJdEyXd2CuswiaMydo

var npsUrl = "https://developer.nps.gov/api/v1/parks?";
var npsKey = "?&api_key=dAupn5zXkxUdXIomwX4fK9R6zhTDSV7j3bEW5IFp";

var userInput = document.getElementById('default-search');


var items = [
    {
        position: 0,
        el: document.getElementById('carousel-item-1')
    },
    {
        position: 1,
        el: document.getElementById('carousel-item-2')
    },
    {
        position: 2,
        el: document.getElementById('carousel-item-3')
    },
    {
        position: 3,
        el: document.getElementById('carousel-item-4')
    },
    {
        position: 4,
        el: document.getElementById('carousel-item-5')
    }
];

// Chain promising 
async function carousel() {
    var res1 = await fetch(unsplashUrl + unsplashKey);
    var data1 = await res1.json();
    items[0].el.children[0].setAttribute("src", data1.urls.regular);

    var res2 = await fetch(unsplashUrl + unsplashKey);
    var data2 = await res2.json();
    items[1].el.children[0].setAttribute("src", data2.urls.regular);

    var res3 = await fetch(unsplashUrl + unsplashKey);
    var data3 = await res3.json();
    items[2].el.children[0].setAttribute("src", data3.urls.regular);

    var res4 = await fetch(unsplashUrl + unsplashKey);
    var data4 = await res4.json();
    items[3].el.children[0].setAttribute("src", data4.urls.regular);

    var res5 = await fetch(unsplashUrl + unsplashKey);
    var data5 = await res5.json();
    items[4].el.children[0].setAttribute("src", data5.urls.regular);
}

carousel();

async function randomParks(){
    var rand;
    var indexNum = [];
    for(var i=0; i < 3; i++){
        rand = Math.floor(Math.random() * 49);
        indexNum.push(rand);
    }

    console.log(indexNum);

    fetch(npsUrl + npsKey)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log('data', data);
            for(var i=0; i < 3; i++){
                var cardId = document.getElementById("park-" + (i+1).toString());
                console.log(cardId.children[0].children[1].children[0].textContent);
                console.log(data.data[indexNum[i]].name);
                cardId.children[0].children[1].children[0].textContent = data.data[indexNum[i]].name;
                cardId.children[0].children[1].children[1].textContent = data.data[indexNum[i]].description;
                cardId.children[0].children[1].children[2].setAttribute('href', data.data[indexNum[i]].url)
                cardId.children[0].children[0].setAttribute('src', data.data[indexNum[i]].images[0].url)
            }
        })

}

randomParks();

// Parks by location
function localParks(){
    var location = userInput.value;
    var searchQuery = npsUrl + "&q=" + location + npsKey;

    fetch(searchQuery)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log('data', data);
            for(var i=0; i <=6; i++){
            var searchYield = document.getElementById("searchYield");
            searchYield.innerHTML = card;

            var description = data.data[i].description;
            var name = data.data[i].name;
            var img = data.data[i].images[2].url;

                const cardHTML = `<article class="m-auto">
                <div id="card">
                    <div
                        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img class="rounded-t-lg" src="`+img+`" alt="" />
                        <div class="p-5">
                            <h4 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white p-2">
                            `+name+`</h4>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">`+description+`</p>
                            <a href="#"
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </article>`

            var card = cardHTML;
            

            }
        })

}


// Save last search history
// check for localstorage

// empty string
var searchHistory = [];

document.getElementById("submitBtn").addEventListener('click', function (event) {
    event.preventDefault();
    localParks();
    // get search word
    var name = userInput.value;

    // formatting the name to cut any end spaces
    name = name.trim();

    // Setting local storage with initial key-value pair and adding more values to the key 'history'
    searchHistory.push(name);   
    localStorage.setItem('history', JSON.stringify(searchHistory));

})



// document.getElementById("submitBtn").addEventListener('click', function (event) {
//     event.preventDefault();
    
//     // get search word
//     var name = userInput.value;



//     getHistory = localStorage.getItem('history')?JSON.parse(localStorage.getItem('history')) : [];

//     getHistory.push(searchHistory);
//     localStorage.setItem('history', JSON.stringify(name));


// })


// if(localStorage.getItem('history')){
//     searchHistory = JSON.parse( localStorage.getItem('history'));

// }

// addHistory(name);
// console.log(searchHistory);

// function addHistory(dataSaved){
//     searchHistory.push(dataSaved);
//     localStorage.setItem('searched', JSON.stringify(searchHistory));
// }

    // // Local Storage
    // localStorage.setItem('history', name);
    // localStorage.getItem('history');
