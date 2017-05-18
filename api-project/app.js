//APP INITIALISES
const appState = {
  emojis:
    {
      happy: 1,
      party: 2,
      fire: 3,
      relax: 4,
      sad: 5
    },
  playlist: [],
  selectEmoji: false,
  currentQuery: null,
  nextQuery: null,
  prevQuery: null,
}
// AJAX
function fetchPlaylists(searchTerm, callback) {
  const BASE_API = 'https://api.spotify.com/v1/search';

  const params = {
    q: searchTerm,
    type: 'playlist',
    limit: 5,
  };

  $.ajax({
    method: 'GET',
    url: BASE_API,
    data: params,
    success: response => {
      console.log(response);
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
      callback(playData(obj));
    }
  })
}
function loadData(data) {
  appState.playlist = data.items;
  appState.nextQuery = data.nextQ;
  appState.prevQuery = data.previousQ;
};
//STATE MODS
function clickEmoji(state, emoji){
  for (let prop in state.emojis) {
    if (prop === emoji) {
      state.currentQuery = state.emojis[prop];
    }
  }
}
//RENDER
function render(state){
  console.log(state);
  let resultPlaylists='';
  if (state.playlist){
    state.playlist.forEach(function(item){
      resultPlaylists += `<img src="${item.url}">`;
      //console.log(item.url);
    });
  }
  else{
    resultPlaylists += '<p>No results</p>';
  }
  $('.show-playlists').html(resultPlaylists);
}
//EVENT HANDLERS
function eventHandlers(){
    $('.emoji').on('click', function(event){
      let emojiType = $(event.currentTarget).attr('emoji-type');
      clickEmoji(appState, emojiType);
      render(appState);
    });
}
//RUN THIS ENTIRE CUTE THING
$(function(){
    eventHandlers();
    render(appState, '');
});
