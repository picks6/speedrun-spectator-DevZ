
// search button
var btnEl = document.getElementById("searchBtn");
var fetchURL;

function createURL(){
  var searchInputEl = document.querySelector("#form1");
  var userNameSearch = searchInputEl.value;
  var fetchURL = "https://www.speedrun.com/api/v1/users/"+userNameSearch;
  console.log(fetchURL);
  findUser(fetchURL);
}
//build the url with the url of the search page, the search terms and search scope and browse to it
var apiKey = "nae9f81ug4cq6pljys6me3xxj";
var preSearchUrlUser = "https://www.speedrun.com/api/v1/users";
var preSearchUrlGame = "https://www.speedrun.com/api/v1/games";
var preSearchUrlRun = "https://www.speedrun.com/api/v1/runs";
var preSearchUrlVariable = "https://www.speedrun.com/api/v1/variables";
var preSearchUrlID = "https://www.speedrun.com/api/v1";
var humanInputUser;
var humanInputGame;
var humanInputRun;
var humanInputVariable;
var humanInputID;
var completedFetchUrl;
var initialData;
var userData;
var gameData;
var runData;
var variableData;
var idData;
var userId;
var url;
var id;
var arrayUser = [];
var arrayGame = [];
var arrayRun = [];
var arrayVariable = [];
var arrayID = [];
var buildArray = [];
var searchArrayReturn = []
var userName = "";
var gameID = '';
var urlTest = '';
var gameName = '';

function makeSearchUrlUser () {
  url = preSearchUrlUser + "/" + humanInputUser;
};

function userInfoFetch(url) {
    searchArrayReturn = [];
    fetch(url)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    userData = data;
    console.log("User data is here:")
    console.log(userData); 
    var buildArray = [];
    for(i=0; i<userData.data.length; i++){
      gameID = userData.data[i].run.game;
        //console.log(gameID);
      gameFetchURL = "https://www.speedrun.com/api/v1/games/"+gameID;
        // urltest.substring(25, urltest.indexOf('/run'))
        
      urlTest = userData.data[i].run.weblink;
      catID =  userData.data[i].run.category
      fetchCatUrl = "https://www.speedrun.com/api/v1/categories/"+catID;

      var runObject = {
        name: "",
        game: "",
        category: "",
        place: "",
        time: "",
        run_link: "",
      };
      runObject.name = userName;
        //runObject.game =  gameName //urlTest.substring(25, urlTest.indexOf('/run'))
        runObject.place = userData.data[i].place;
        //runObject.time = userData.data[i].run.times.primary_t;
        runObject.run_link = urlTest;
        //console.log(gameName);
        
      
        findGameName(runObject, gameFetchURL);
        findCatName(runObject, fetchCatUrl);
        toTime(runObject, userData.data[i].run.times.primary_t)
        // console.log('urlTest:', urlTest)
        // console.log('runObject value:', runObject)
        // console.log('runObject.run_link in for loop:', runObject.run_link)
        buildArray.push(runObject);
    };
    searchArrayReturn = buildArray;
    console.log(searchArrayReturn);
    console.log(newFetchUrl);
    console.log("All processes complete.");
  return;
  })
  // !!! AUTOMATICALLY CALLING THE DISPLAY RESULTS FUNCTION DOES NOT WORK, NOT SURE WHY.
  /* .then(function(){
    displayResults();
  }) */
};


function findUser(url) {
  fetch(url)
      .then(function (response) {
        //console.log(response.status);
        //Error Handling for users not found
        if (response.status == '404'){
          showErrorModal();
          console.log("this is where an error modal would go");
        }
        return response.json();
      })
      .then(function (data) {
        initialData = data;
        console.log("Un-organized Data is here:");
        userName = initialData.data.names.international
        console.log(userName)
        return initialData;
      })
      .then(function(initialData) {
        id = initialData.data.id;
        console.log("Variable ID: " + id);
        newFetchUrl = 'https://www.speedrun.com/api/v1/users/'+id+'/personal-bests';
        return newFetchUrl;
      })
      .then(function() {
        userInfoFetch(newFetchUrl);
        return;  
      });
  };

 
  function findGameName(object, url){
      fetch(url)
        .then(function (response){
            return response.json();
        })
        .then (function(data) {
            gameData = data;
            object.game = (gameData.data.names.international);
            console.log(gameName);
           // searchArrayReturn.push(object)
        });
  }

  function findCatName(object, url){
    fetch(url)
      .then(function (response){
          return response.json();
      })
      .then (function(data) {
          catData = data;
          console.log(catData);
          object.category = (catData.data.name);
          // searchArrayReturn.push(object)
      });
}


//function to convert time to hrs/mins/seconds  
function toTime(object, seconds){
    var retime = ''
    var date = new Date(null);
    date.setSeconds(seconds);
    retime = date.toISOString().substr(11, 8);
//if hrs = 0, only show mins/seconds
    if(retime.substr(0,3) == '00:'){
      retime2 = retime.substr(3,retime.length)
      object.time = retime2
    }
    else object.time = retime 
    
};

function displayResults() {
  var searchResultsContainer = document.getElementById("search-results");
  // RESET RESULTS BOX TO BLANK
  document.getElementById('search-results').innerHTML = '<h2 id="search-results-header"></h2><br><table id="search-results-table"></table>';
  var searchResultsHeader = document.getElementById("search-results-header");
  // SEARCH RESULTS HEADER
  searchResultsHeader.innerHTML = "Search Results:";

  // TABLE-BUILDING BEGINS
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.classList.add("table", "table-striped", "table-hover");

  table.appendChild(thead);
  table.appendChild(tbody);

  // SETTING UP ROW OF LABELS
  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  let heading_2 = document.createElement('th');
  let heading_3 = document.createElement('th');
  let heading_4 = document.createElement('th');
  let heading_5 = document.createElement('th');
  heading_1.setAttribute("scope", "col");
  heading_2.setAttribute("scope", "col");
  heading_3.setAttribute("scope", "col");
  heading_4.setAttribute("scope", "col");
  heading_5.setAttribute("scope", "col");
  heading_1.innerHTML = "Name";
  heading_2.innerHTML = "Game";
  heading_3.innerHTML = "Place";
  heading_4.innerHTML = "Time";
  heading_5.innerHTML = "Link";

  // DISPLAYING ROW OF LABELS
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  thead.appendChild(row_1);

  // SETTING UP AND DISPLAYING ROWS OF RESULTS (the entire for-loop)
  for (i=0; i<=4; i++) {
    let row = document.createElement('tr');
    let name = document.createElement('td');
    let game = document.createElement('td');
    let place = document.createElement('td');
    let time = document.createElement('td');
    let run_link = document.createElement('td');

    var anchor = document.createElement("a");
    anchor.setAttribute("href", searchArrayReturn[i].run_link);
    anchor.setAttribute("target", "_blank");
    var link = document.createElement("button");
    link.setAttribute("name", "col-1");
    link.setAttribute("href", searchArrayReturn[i].run_link);
    link.setAttribute("target", "_blank");
    link.className = "followLinkBtn";
    var fontAwesomeGraphic = document.createElement("i");
    fontAwesomeGraphic.classList.add("fas", "fa-play");

    run_link.appendChild(anchor);
    anchor.appendChild(link);
    link.appendChild(fontAwesomeGraphic);

    row.setAttribute("scope", "row");

    name.innerHTML = searchArrayReturn[i].name;
    game.innerHTML = searchArrayReturn[i].game;
    place.innerHTML = searchArrayReturn[i].place;
    time.innerHTML = searchArrayReturn[i].time;

    row.appendChild(name);
    row.appendChild(game);
    row.appendChild(place);
    row.appendChild(time);
    row.appendChild(run_link);
    tbody.appendChild(row);
  }

  searchResultsContainer.appendChild(table);
};


// MODAL for ERRORS
function showErrorModal () {errorInputModal.toggle();}
var errorInputModal = new bootstrap.Modal(document.getElementById('bad-input-modal'));


// SEARCH BUTTON EVENT LISTENER
btnEl.addEventListener('click',createURL);
