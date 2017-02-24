angular.module('app', ['firebase'])
  .constant('FirebaseUrl', 'https://codesmells.firebaseio.com/')
  .constant('ItemsUrl', 'https://codesmells.firebaseio.com/items')
  .service('rootRef', ['FirebaseUrl', Firebase])
  .service('itemsRef', ['ItemsUrl', Firebase])
  .controller('MyCtrl', MyController);

function MyController($firebaseArray, itemsRef) {
  // this works and smells fresh
  this.items = $firebaseArray(itemsRef);
  // we can't do this even though it would smell great
  // this.first = this.items.$keyAt(0);
  
  // so we have to do this, which smells like Limburger cheese
  this.items.$loaded().then(function(data) {
    this.first = data.$keyAt(0);
  }.bind(this));
}