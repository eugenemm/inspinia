(function () {
  'use strict';

  angular
    .module('dossier', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap',
      'dx',
      'ui.sortable',
      'auth0.lock', 'angular-jwt']);

  // const locale = 'ru';
  // Promise.all([
  //   // Core
  //   fetch('assets/localization/supplemental/likelySubtags.json'),

  //   // Date
  //   fetch('assets/localization/main/' + locale + '/ca-gregorian.json'),
  //   fetch('assets/localization/main/' + locale + '/timeZoneNames.json'),
  //   fetch('assets/localization/supplemental/timeData.json'),
  //   fetch('assets/localization/supplemental/weekData.json'),

  //   // Number
  //   fetch('assets/localization/main/' + locale + '/numbers.json'),
  //   fetch('assets/localization/supplemental/numberingSystems.json'),

  // ])
  //   .then(function (responses) {
  //     return Promise.all(responses.map(function (response) {
  //       return response.json();
  //     }));
  //   })
  //   .then(function (json) {
  //     Globalize.load(json);
  //   })
  //   .then(function () {
  //     Globalize.locale(locale);
  //   });

  // DevExpress.localization.locale(locale);

})();
