// APP INITIALISES
// const testData = [
//   {
//     height: null,
//     name: "It's Lit 🔥",
//     spotify: "http://open.spotify.com/user/marquez.anthony96/playlist/4x5uuUCh7VxyiuCV1gGejF",
//     url: "https://u.scdn.co/images/pl/default/733dd40bc3bbe082264eff3b8d2ba6350e9a872d",
//     width: null,
//   },
//   {
//     height: 300,
//     name: "It's lit",
//     spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
//     url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
//     width: 300,
//   },
//   {
//     height: 300,
//     name: "It's lit",
//     spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
//     url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
//     width: 300,
//   },
//   {
//     height: 300,
//     name: "It's lit",
//     spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
//     url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
//     width: 300,
//   },
//   {
//     height: 300,
//     name: "It's lit",
//     spotify: "http://open.spotify.com/user/spotify/playlist/37i9dQZF1DWWmG4xgoLORa",
//     url: "https://i.scdn.co/image/b6e4f3def28f6ed06bbb10d41e9a389dd04f6ee7",
//     width: 300,
//   },
// ]

const appState = {
  emojis:
    {
      happy: 'upbeat music',
      party: 'party music',
      fire: 'it\'s lit',
      relax: 'chill',
      sad: 'sad'
    },
  playlist: [],
  currentQuery: null,
  nextQuery: null,
  prevQuery: null,
}

// AJAX
function fetchPlaylists(searchTerm, callback, pageURL) {
  const BASE_API = 'https://api.spotify.com/v1/search';
  const PREV_NEXT = pageURL; // pull in full query URL for AJAX call

  const params = {
    q: searchTerm,
    type: 'playlist',
    limit: 5,
  };

  // this works by itself
  // $.ajax({
  //   method: 'GET',
  //   url: BASE_API,
  //   data: params,
  //   success: response => {
  //     loadData(editData(response));
  //   },
  // });

  //load playlists on initial click
  let initLoad = $.ajax({
    method: 'GET',
    url: BASE_API,
    data: params,
    success: response => {
      callback(editData(response));
    },
  });
  //load playlists on prev or next button click
  let btnLoad = $.ajax({
    method: 'GET',
    url: PREV_NEXT,
    //processData: false, //deactivate need to process params for query string
    success: response => {
      callback(editData(response));
    },
  });
  //Conditional for which AJAX call to make and render.;
  (searchTerm) ? initLoad : btnLoad;
};


//CALLBACK FUNCTIONS
function editData(response) {
let obj = response['playlists'];
const items = obj['items'].map(item => {
  const {spotify} = item['external_urls'];
  const {height, url, width} = item['images'][0];
  const name = item['name'].substring(0, 18);
  const ownerId = item['owner']['id'];
  const id = item['id'];
  return {
    spotify, url, name, id, ownerId
  };
});
const nextQ = obj['next'];
const previousQ = obj['previous'];
return {
  items, nextQ, previousQ
  };
};

function loadData(data) {
  appState.playlist = data.items;
  appState.nextQuery = data.nextQ;
  appState.prevQuery = data.previousQ;
  render(appState); //Cheating way to hook a render into each data reload.
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
      resultPlaylists += `<iframe src="https://open.spotify.com/embed?uri=spotify:user:${item.ownerId}:playlist:${item.id}&theme=white&view=coverart" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>`;
      // This is the original code going in where the iframe is now at.
      // We are saving it in the event that playlists do not work.
      // <div class="each-playlist"><a href="${item.spotify}"><img src="${item.url}"></a><h3>${item.name}</h3></div>
    });
  }
  else{
    resultPlaylists += '<p>No results</p>';
  };

  (state.nextQuery) ? $('.js-next').show() : $('.js-next').hide();
  (state.prevQuery) ? $('.js-prev').show() : $('.js-prev').hide();
  $('.show-playlists').html(resultPlaylists);
};

//EVENT HANDLERS
function eventHandlers(){
    $('.emoji').on('click', function(event){
      let emojiType = $(event.currentTarget).data('emojitype');
      clickEmoji(appState, emojiType);
      fetchPlaylists(appState.currentQuery, loadData, null);
      return false;
    });
    $('.js-nav-buttons').on('click', '.js-prev', function(event) {
      fetchPlaylists(null, loadData, appState.prevQuery);
      return false;
    })
    $('.js-nav-buttons').on('click', '.js-next', function(event) {
      fetchPlaylists(null, loadData, appState.nextQuery);
      return false;
    })
};
//RUN THIS ENTIRE CUTE THING
$(function(){
    eventHandlers();
    render(appState, '');
});
