//APP INITIALISES
const appState={
  playlist = [],
  currentQuery = null,
  nextQuery = null,
  prevQuery = null,
}
// AJAX
function fetchPlaylists(searchTerm, callback) {
  const BASE_API = https://api.spotify.com/v1/search;

  const params = {
    q: searchTerm,
    type: playlist,
    limit: 5,
  };

  $.ajax({
    method: 'GET',
    url: BASE_API,
    data: params,
    success: response => {
      const playlists = response.items.map(item => {
        
      })
    }
  })
}

//STATE MODS
function nameHere(state){
    //state.addHere=
}
//RENDER
function render(state){

}
//EVENT HANDLERS
function eventHandlers(){
    $('.HTMLCLASSSTUFF').click(function(event){
        // CHANGE STATE WITH STATE MOD FUNCTION
        // INVOKE RENDER FUNCTION
    });
}
//RUN THIS ENTIRE CUTE THING
$(function(){
    eventHandlers();
    render(appState, '');
});
