(function () {
'use strict';

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope){
  $scope.message = "";
  $scope.menuCheck = function(){
    if (!$scope.menu || !$scope.menu.trim()) {
      $scope.fontColor = "#FF0000";
      $scope.message = "Please enter data first";
    } else {
      var items = $scope.menu.split(",").filter(function(item) {
        return item.trim().length > 0;
      });
      $scope.fontColor = "#00FF00";
      if (items.length > 3){
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
  };

}
})();
