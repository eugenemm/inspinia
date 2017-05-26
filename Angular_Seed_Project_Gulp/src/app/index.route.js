(function() {
  'use strict';

  angular
    .module('dossier')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html"
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "app/pages/main/main.html",
        controller: 'MainController',
        controllerAs: "main",
        data: { pageTitle: 'Example view' }
      })
      .state('index.minor', {
        url: "/minor",
        templateUrl: "app/pages/minor/minor.html",
        controller: 'MainController',
        controllerAs: "main",
        data: { pageTitle: 'Example view' }
      })
      
      
       .state('requests', {
        abstract: true,
        url: "/requests",
        templateUrl: "app/components/common/content.html"
      })
      .state('requests.queries', {
        url: "/main",
        templateUrl: "app/pages/main/main.html",
        controller: 'MainController',
        controllerAs: "main"        
      })
      .state('requests.packages', {
        url: "/minor",
        templateUrl: "app/pages/minor/minor.html",
        controller: 'MainController',
        controllerAs: "main"        
      });;

    $urlRouterProvider.otherwise('/index/main');
  }

})();
