// APP INITIALISES
const testData = [
  {
    height: null,
    name: "It's Lit 🔥",
    spotify: "http://open.spotify.com/user/marquez.anthony96/playlist/4x5uuUCh7VxyiuCV1gGejF",
    url: "https://u.scdn.co/images/pl/default/733dd40bc3bbe082264eff3b8d2ba6350e9a872d",
    width: null,
  },
  {
    height: 300,
    name: "It's lit",
    spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
    url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
    width: 300,
  },
  {
    height: 300,
    name: "It's lit",
    spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
    url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
    width: 300,
  },
  {
    height: 300,
    name: "It's lit",
    spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
    url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
    width: 300,
  },
  {
    height: 300,
    name: "It's lit",
    spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
    url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
    width: 300,
  },
]

const appState = {
  emojis:
    {
      happy: 'upbeat music',
      party: 'party music',
      fire: 'it\'s lit',
      relax: 'chill',
      sad: 'sad'
    },
  playlist: testData,
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
  });
};
function loadData(data) {
  appState.playlist = data.items;
  appState.nextQuery = data.nextQ;
  appState.prevQuery = data.previousQ;
  render(appState);
};

//STATE MODS
function clickEmoji(state, emoji){
  for (let prop in state.emojis) {
    if (prop === emoji) {
      state.currentQuery = state.emojis[prop];
    };
  };
};

//RENDER
function render(state){
  let resultPlaylists='';
  if (state.playlist){
    state.playlist.forEach(function(item){
      resultPlaylists += `<a href="${item.spotify}"><img src="${item.url}"></a>`;
    });
  }
  else{
    resultPlaylists += '<p>No results</p>';
  };

  // (state.nextQuery) ? $('.js-next').show() : $('.js-next').hide();
  // (state.prevQuery) ? $('.js-prev').show() : $('.js-prev').hide();
  $('.show-playlists').html(resultPlaylists);
};

//EVENT HANDLERS
function eventHandlers(){
    $('.emoji').on('click', function(event){
      let emojiType = $(event.currentTarget).data('emojitype');
      clickEmoji(appState, emojiType);
      fetchPlaylists(appState.currentQuery, loadData);
    });
    $('.js-prev').click(function(event) {

    })
    $('.js-next').click(function(event) {

    })
};
//RUN THIS ENTIRE CUTE THING
$(function(){
    eventHandlers();
    render(appState, '');
});
