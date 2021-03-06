'use strict';

juke.factory('AlbumFactory', function ($http, SongFactory,$log) {

  var AlbumFactory = {};

  AlbumFactory.fetchAll = function () {
    return $http.get('/api/albums')
    .then(function (response) { return response.data; })
    .then(function (albums) { return albums.map(AlbumFactory.convert); });
  };

  AlbumFactory.fetchById = function (id) {
    return $http.get('/api/albums/' + id)
    .then(function (response) { return response.data; })
    .then(AlbumFactory.convert)
    .then(function (album) {
      album.songs = album.songs.map(SongFactory.convert);
      return album;
    });
  };

  AlbumFactory.convert = function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    return album;
  };

  AlbumFactory.getSongs=function(albumId){
    var url='/api/albums/'+albumId+'/songs';
    return $http.get(url)
    .then(function (response) { 
      return response.data; 
    });
    
  }

  return AlbumFactory;

});
