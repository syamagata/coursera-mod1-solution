(function () {
'use strict'

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);

function LunchCheckController ($scope){
  $scope.message = "";
  $scope.menuCheck = function(){
    var message = "";
    if (!$scope.menu) {
      $scope.fontColor = "#FF0000"
      $scope.message = "Please enter data first";
    } else {
      var items = $scope.menu.split(",");
      $scope.fontColor = "#00FF00"
      if (items.length > 3){
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
  };

};
})();
