'use strict';

angular.module('dossier')
  .controller('MainController', function ($scope, $state) {

    var vm = this;

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in dossier Gulp SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

    $scope.sortableOptions = {
      connectWith: ".connectPanels",
      handler: ".ibox-title"
    };

    $scope.title = "title page!!!";

    $scope.items = [];

    $scope.dataGridOptions = {
      dataSource: customers,
      paging: {
        pageSize: 10
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
        showInfo: true
      },
      columns: ["CompanyName", "City", "State", "Phone", "Fax"]
    };

  });
