var app = angular.module("builderApp", []);
app.controller("builderControl", function($scope, $http, $timeout) {
  
  // https get all data from api
  $http
    .get("https://interview.switchme.in/js/2019/builder_json.php")
    .then(function(response) {
      $scope.builders = response.data;
    });
  $http
    .get("https://interview.switchme.in/js/2019/city_json.php")
    .then(function(response) {
      $scope.cities = response.data;
    });
  $http
    .get("https://interview.switchme.in/js/2019/price_json.php")
    .then(function(response) {
      $scope.price = response.data;
    });
  $http
    .get("https://interview.switchme.in/js/2019/project_json.php")
    .then(function(response) {
      $scope.projects = response.data;
    });

  // store all array of project data
  $scope.allProjectData = [];

  $scope.filterTableValue;

  // store filter value order
  $scope.priceOrder = "";

  // Selected builder array
  $scope.selectedBuilders = [];

  //   selected price array
  $scope.selectedPrice = [];

  // temperory storage of table data
  temptableData = [];

  // flag for all check box 
  $scope.builderAllCheck = false;
  $scope.priceAllCheck = false;
  $scope.builderFilterCheck = false;
  $scope.priceFilterCheck = false;


  /**based on input filter cities in table data
   *
   *
   * @param {*} myE
   */
  $scope.selectedCities = function(myE) {
    console.log("projects", myE.target.value);
    if (myE.target.value == "All City") {
      $scope.tableData = $scope.allProjectData;
      $scope.builderData = $scope.tableData;
      $scope.priceData = $scope.tableData;
      temptableData = $scope.tableData;
    } else {
      $scope.tableData = $scope.allProjectData.filter(function(project) {
        return project.cityName == myE.target.value;
      });
      $scope.builderData = $scope.tableData;
      $scope.priceData = $scope.tableData;
      temptableData = $scope.tableData;
    }
    console.log($scope.tableData);
  };

  /**based on input sort order by price 
   *
   *
   * @param {*} myE
   */
  $scope.selectedPriceSort = function(myE) {
    // console.log("projects", myE.target.value);
    if (myE.target.value == "All") {
      $scope.priceOrder = "";
    } else if (myE.target.value == "LOW") {
      $scope.priceOrder = "price";
    } else if (myE.target.value == "HIGH") {
      $scope.priceOrder = "-price";
    }
    // console.log($scope.tableData);
  };

  /**on secelcted checkbox filter builder form table list
   *
   *
   * @param {*} myE
   */
  $scope.selectedBuilder = function(myE) {
    var idx = $scope.selectedBuilders.indexOf(myE);
    // Is currently selected
    if (idx > -1) {
      $scope.selectedBuilders.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selectedBuilders.push(myE);
    }
   
    if ($scope.selectedBuilders.length > 0 && $scope.builderAllCheck == false) {
      $scope.builderAllCheck = false;
      $scope.builderFilterCheck = false;
      $scope.tableData = $scope.selectedBuilders;
      temptableData = $scope.tableData;
    } else if (
      $scope.selectedBuilders.length > 0 &&
      $scope.builderAllCheck == true
    ) {
      $scope.selectedBuilders = [];
      $scope.builderAllCheck = false;
      $scope.builderFilterCheck = false;
    } else {
      $scope.builderAllCheck = true;
      $scope.builderFilterCheck = true;
      $scope.tableData = $scope.builderData;
      temptableData = $scope.tableData;
    }
  };

  /**seelct all method for checkbox all check condition
   *
   *
   * @param {*} myE
   */
  $scope.selectAll = function(myE) {
    if (myE == "builder") {
      $scope.builderAllCheck = true;
      $scope.builderFilterCheck = true;
      $scope.tableData = $scope.builderData;
    } else if (myE == "price") {
      $scope.priceAllCheck = true;
      $scope.priceFilterCheck = true;
      $scope.tableData = $scope.priceData;
    }
  };

  /**on selected checkbox filter price form table list
   *
   *
   * @param {*} myE
   */
  $scope.selectedPrices = function(price) {
    var idx = $scope.selectedPrice.indexOf(price);
    // Is currently selected
    if (idx > -1) {
      $scope.selectedPrice.splice(idx, 1);
    }

    // Is newly selected
    else {
      $scope.selectedPrice.push(price);
    }
    console.log($scope.selectedPrice);
    if ($scope.selectedPrice.length > 0 && $scope.priceAllCheck == false) {
      $scope.priceAllCheck = false;
      $scope.priceFilterCheck = false;
      $scope.tableData = $scope.selectedPrice;
      temptableData = $scope.tableData;
    } else if (
      $scope.selectedPrice.length > 0 &&
      $scope.priceAllCheck == true
    ) {
      $scope.selectedPrice = [];
      $scope.priceAllCheck = false;
      $scope.priceFilterCheck = false;
    } else {
      $scope.priceAllCheck = true;
      $scope.priceFilterCheck = true;
      $scope.tableData = $scope.priceData;
      temptableData = $scope.tableData;
    }
  };

  // wait till 2 seconds then finilize all dat in on final array 
  setTimeout(function() {
    for (let builderId in $scope.projects) {
      let tempBuilderName;
      //  finidng builder name
      for (let builder in $scope.builders) {
        if (builderId == builder) {
          tempBuilderName = $scope.builders[builder];
          break;
        }
      }
      // get the project name and cities name
      for (let project of $scope.projects[builderId]) {
        for (let city in $scope.cities) {
          if (project.city == city) {
            project["builderId"] = builderId;
            project["cityName"] = $scope.cities[city];
            project["builderName"] = tempBuilderName;
            project["Selected"] = false;
            break;
          }
        }
        for (let projectId in $scope.price) {
          if (project.project_id == projectId) {
            project["price"] = $scope.price[projectId];

            break;
          }
        }
        $scope.allProjectData.push(project);
      }
    }
  }, 2000);

  // update dom after getting all data
  $timeout(function() {
    $scope.tableData = $scope.allProjectData;
    $scope.builderData = $scope.tableData;
    $scope.priceData = $scope.tableData;
    $scope.price;
  }, 3000);
});
