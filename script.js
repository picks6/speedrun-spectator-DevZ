
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
});
}




function findUser(url) {
  fetch(url)
      .then(function (response) {
        //console.log(response.status);
        //Error Handling for users not found
        if (response.status == '404'){
          var errorMessage = $("<h2> User Not Found </h2>");
          $('#search-results').append(errorMessage);
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
    
  }  

  function buildResultsBox(){
    var title = $("<h2> TEST </h2>");
    $('#search-results').append(title);

  }
  btnEl.addEventListener('click',createURL);
