
var app = angular.module('myApp', ['ui.router', 'ngMaterial', 'ngMessages']);

app.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("home", {
        url: "/",
        controller: "homeCtrl",
        templateUrl: "app/views/home.html"
    })
  
});
