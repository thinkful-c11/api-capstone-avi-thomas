//everything looks pretty solid. Maybe next time remove the console logs used for testing prior to pushing.
//liked the use of return false on the event listeners.
//Love the app idea!

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

// IN WHICH WE MAKE AJAX REQUESTS
function fetchPlaylists(searchTerm, callback, pageURL) {
  console.log('fetch??');
  const BASE_API = 'https://api.spotify.com/v1/search';
  const PREV_NEXT = pageURL; // pull in full query URL for AJAX call

  const params = {
    q: searchTerm,
    type: 'playlist',
    limit: 5,
  };

  //in which we load playlists on initial click
  function initLoad() {
    $.ajax({
      method: 'GET',
      url: BASE_API,
      data: params,
      success: response => {
        console.log(response);
        callback(editData(response));
      },
    });
  }
  //in which we load playlists on prev or next button click
  function btnLoad() {
    $.ajax({
    method: 'GET',
    url: PREV_NEXT,
    success: response => {
      console.log('next or prev clicked??');
      callback(editData(response));
    },
  });
}
  //Conditional for which AJAX call to make and render.;
  (searchTerm) ? initLoad() : btnLoad();

};

//IN WHICH WE MODIFY THE STATE

//in which we edit the data to our liking
function editData(response) {
let obj = response['playlists'];
console.log(obj);
const items = obj['items'].map(item => {
  const {spotify} = item['external_urls'];
  const {height, url, width} = item['images'][0];
  const name = item['name'].substring(0, 18); //Only keep 18 char for stlying
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

//in which we load the data into the state object
function loadData(data) {
  appState.playlist = data.items;
  appState.nextQuery = data.nextQ;
  appState.prevQuery = data.previousQ;
  render(appState); //Cheating way to hook a render into each data reload.
};

//in which we set the current query in the state
function clickEmoji(state, emoji){
  for (let prop in state.emojis) {
    if (prop === emoji) {
      state.currentQuery = state.emojis[prop];
    };
  };
};

//IN WHICH WE RENDER
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

//IN WHICH WE HANDLE THE EVENTS
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
//IN WHICH WE RUN THIS ENTIRE CUTE THING
$(function(){
    eventHandlers();
    render(appState, '');
});
