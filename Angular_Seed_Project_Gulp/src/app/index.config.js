(function () {
    'use strict';

    angular.module('dossier')
        .config(config);

    /** @ngInject */
    function config(lockProvider) {

        var auth0Domain = 'dossier.eu.auth0.com';

        var auth0Settings = {
            domain: auth0Domain,
            APIURL: `https://${auth0Domain}/api/v2`,
            client_id: 'Z4hUa7paDxfUqJrTcZfmvBCRQk5go03L',
            client_secret: 'RdQ6UTVN2PuRZJfY2Uj5qdYsF-BVGSr1cz0Z-t5ifMrnHBrmnEtuqGypsaFrd58P',
            //audience: `https://${auth0Domain}/api/v2/`

        };

        var clientId = auth0Settings.client_id;
        var domain = auth0Domain;
        var options = {
            auth: {
                redirect: false,
                params: {
                    //audience: 'ocenka-api',
                    scope: 'openid user_metadata app_metadata profile'
                    //scope: 'openid'
                }
            },
            _idTokenVerification: true,
            language: "ru",
            allowSignUp: false,
            autoclose: true,
            closable: false,
            allowForgotPassword: true,
            languageDictionary: {
                emailInputPlaceholder: "email",
                title: "Досье",
            },
            rememberLastLogin: false,
            theme: {
                labeledSubmitButton: false,
                logo: "",
                primaryColor: "#5aadbb"
            },
        };

        lockProvider.init(
            {
                clientID: clientId,
                domain: domain,
                options: options
            });


    }
})();
