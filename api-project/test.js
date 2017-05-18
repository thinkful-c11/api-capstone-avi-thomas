const data = {
  "playlists": {
    "href": "https://api.spotify.com/v1/search?query=metal&type=playlist&offset=0&limit=2",
    "items": [
      {
        "collaborative": false,
        "external_urls": {
          "spotify": "http://open.spotify.com/user/lindsanx/playlist/2OIB1w1BJteDbOtWm6CR4H"
        },
        "href": "https://api.spotify.com/v1/users/lindsanx/playlists/2OIB1w1BJteDbOtWm6CR4H",
        "id": "2OIB1w1BJteDbOtWm6CR4H",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/a244683e74a00ce66006152a06a714ce162edb0e4cab1d14970b50071890b36dcf91174ccb763b87101ff33ee70f7a91faf4cbd418a8b6bc7b62b30a8b651025720e79342c0b8d04c358cc1c29073855",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/a244683e74a00ce66006152a06a714ce162edb0e4cab1d14970b50071890b36dcf91174ccb763b87101ff33ee70f7a91faf4cbd418a8b6bc7b62b30a8b651025720e79342c0b8d04c358cc1c29073855",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/a244683e74a00ce66006152a06a714ce162edb0e4cab1d14970b50071890b36dcf91174ccb763b87101ff33ee70f7a91faf4cbd418a8b6bc7b62b30a8b651025720e79342c0b8d04c358cc1c29073855",
            "width": 60
          }
        ],
        "name": "Metal",
        "owner": {
          "external_urls": {
            "spotify": "http://open.spotify.com/user/lindsanx"
          },
          "href": "https://api.spotify.com/v1/users/lindsanx",
          "id": "lindsanx",
          "type": "user",
          "uri": "spotify:user:lindsanx"
        },
        "public": null,
        "snapshot_id": "RZq8QME8kX1mOQSoG0Dsnyg3z6CTqBC0Xln++8cNrHvira+0xP3ci3r4pN9XoyTN",
        "tracks": {
          "href": "https://api.spotify.com/v1/users/lindsanx/playlists/2OIB1w1BJteDbOtWm6CR4H/tracks",
          "total": 675
        },
        "type": "playlist",
        "uri": "spotify:user:lindsanx:playlist:2OIB1w1BJteDbOtWm6CR4H"
      },
      {
        "collaborative": false,
        "external_urls": {
          "spotify": "http://open.spotify.com/user/stevenoss/playlist/1ZB4QNB0gch2P8ZOmq69Lz"
        },
        "href": "https://api.spotify.com/v1/users/stevenoss/playlists/1ZB4QNB0gch2P8ZOmq69Lz",
        "id": "1ZB4QNB0gch2P8ZOmq69Lz",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/4ea2ad9d81e366b09589e91573aea3153b12c34cb3724380d249a72829a11d9352ec72994dc0b770eddb21cfbe7427c38ae4f94d22336ebcba3db09d443d95cddfe999686a116e647706f024047660a1",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/4ea2ad9d81e366b09589e91573aea3153b12c34cb3724380d249a72829a11d9352ec72994dc0b770eddb21cfbe7427c38ae4f94d22336ebcba3db09d443d95cddfe999686a116e647706f024047660a1",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/4ea2ad9d81e366b09589e91573aea3153b12c34cb3724380d249a72829a11d9352ec72994dc0b770eddb21cfbe7427c38ae4f94d22336ebcba3db09d443d95cddfe999686a116e647706f024047660a1",
            "width": 60
          }
        ],
        "name": "Nu-Metal",
        "owner": {
          "external_urls": {
            "spotify": "http://open.spotify.com/user/stevenoss"
          },
          "href": "https://api.spotify.com/v1/users/stevenoss",
          "id": "stevenoss",
          "type": "user",
          "uri": "spotify:user:stevenoss"
        },
        "public": null,
        "snapshot_id": "vwJgHKM8QtWQ0siXaBSLdPHjfDbDDldv/aL5bGpBKLnZpfB8mKMqwF0mqixqX3n2",
        "tracks": {
          "href": "https://api.spotify.com/v1/users/stevenoss/playlists/1ZB4QNB0gch2P8ZOmq69Lz/tracks",
          "total": 236
        },
        "type": "playlist",
        "uri": "spotify:user:stevenoss:playlist:1ZB4QNB0gch2P8ZOmq69Lz"
      }
    ],
    "limit": 2,
    "next": "https://api.spotify.com/v1/search?query=metal&type=playlist&offset=2&limit=2",
    "offset": 0,
    "previous": null,
    "total": 18468
  }
}
const obj = data['playlists'];
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


console.log(playData(obj));
