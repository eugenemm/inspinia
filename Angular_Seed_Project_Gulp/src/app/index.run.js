(function () {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $stateParams, authService, lock, $window) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js      
    authService.registerAuthenticationListener();

    // Register the synchronous hash parser
    // when using UI Router
    lock.interceptHash();

     $rootScope.$on('$stateChangeStart', (event, next, current) => {
        //console.log("$rootScope.$on('$routeChangeStart')");
      
      if (!$rootScope.currentUser) {

        let _curr_user = {};

        _curr_user.accessToken  = localStorage.accessToken;
        _curr_user.access_token = localStorage.access_token;        

        if(!_curr_user.accessToken) {
            $rootScope.authService.login();
        }
        else {
            lock.getUserInfo(_curr_user.accessToken, function(error, profile) {
                if (!error) {

                    if(profile.user_metadata && profile.user_metadata.name) {
                        _curr_user.name = profile.user_metadata.name;                        
                    }
                    else {
                        _curr_user.name = profile.name;                        
                    }

                    _curr_user.picture = profile.picture;

                    localStorage.setItem('user_name', _curr_user.name);
                    $rootScope.currentUser = angular.copy(_curr_user);

                    $window.sessionStorage.menus = JSON.stringify([{MenuName: "queries"}, {MenuName : "dashboard"}]);                    
                }
                else {
                    localStorage.removeItem('user_name');
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('access_token');
                    $rootScope.authService.login();
                }

            });
        }

        //$rootScope.$broadcast('userName', 'empty');
      }

    });

  }
})();
