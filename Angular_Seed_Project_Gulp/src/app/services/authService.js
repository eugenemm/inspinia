(function () {

    'use strict';

    angular
        .module('inspinia')
        .service('authService', authService);

    function authService($http, $rootScope, lock, authManager) {

        

        function login() {
            lock.show();
        }


        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {                
                let _curr_user = {};
                _curr_user.accessToken = authResult.accessToken;
                let clientInfo = {
                    'client_id': 'Z4hUa7paDxfUqJrTcZfmvBCRQk5go03L',
                    'client_secret': 'RdQ6UTVN2PuRZJfY2Uj5qdYsF-BVGSr1cz0Z-t5ifMrnHBrmnEtuqGypsaFrd58P',
                    'audience': 'http://localhost:8989/',
                    'grant_type': 'client_credentials'
                };

                $http({
                    method: 'POST',
                    url: 'https://dossier.eu.auth0.com/oauth/token',
                    headers: { 'content-type': 'application/json', 'Authorization': '' },
                    data: clientInfo
                })
                    .then((response) => {
                        // success
                        
                        authManager.authenticate();
                        _curr_user.access_token = response.data.access_token;
                        localStorage.setItem('access_token', _curr_user.access_token);
                        localStorage.setItem('accessToken', _curr_user.accessToken);
                        lock.hide();

                        lock.getUserInfo(_curr_user.accessToken, function (error, profile) {
                            if (!error) {
                                if(profile.user_metadata && profile.user_metadata.name) {
                                    _curr_user.name = profile.user_metadata.name;
                                }
                                else {
                                    _curr_user.name = profile.name;
                                }

                                localStorage.setItem('user_name', _curr_user.name);
                                localStorage.setItem('user_id', profile.identities[0].user_id);
                            }

                            $rootScope.currentUser = angular.copy(_curr_user);
                        });

                    },
                    (response) => { // optional
                        // failed
                        $rootScope.currentUser = null;
                        localStorage.removeItem('user_name');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('access_token');
                    });

            });

            lock.on('authorization_error', function (err) {
                console.log(err);
                $rootScope.currentUser = null;
            });
        }


        function logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('accessToken');
            $rootScope.currentUser = null;
            authManager.unauthenticate();
            lock.show();
        }


        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener
        }
    }
})();