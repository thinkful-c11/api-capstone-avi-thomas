//APP INITIALISES
const appState={
  playlist = [],
  currentQuery = null,
  nextQuery = null,
  prevQuery = null,
}
// AJAX
function fetchPlaylists(searchTerm, callback) {
  const BASE_API = 'https://api.spotify.com/v1/search';

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
      let obj = response['playlists'];
      let playData = function(obj) {
        const items = obj['items'].map(item => {
          const {spotify} = item['external_urls'];
          const {height, url, width} = item['images'][0];
          const name = item['name'];
          const owner = item['owner'];
          return {
            spotify, height, url, width, name
          };
        });
        const nextQ = obj['next'];
        const previousQ = obj['previous'];
        return {
          items, nextQ, previousQ
        };
      };
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
