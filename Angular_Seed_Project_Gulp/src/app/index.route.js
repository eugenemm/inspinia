(function() {
  'use strict';

  angular
    .module('inspinia')
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
      });

    $urlRouterProvider.otherwise('/index/main');
  }

})();
