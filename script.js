
function submitSearch()
{
// If the all radio button is selected search everything on the site
queryVal = ($('#search_txt').val());
fetchURL = $('input[name="radio"]:checked', '#multisearch').val()+queryVal;
console.log(fetchURL);
//build the url with the url of the search page, the search terms and search scope and browse to it
}