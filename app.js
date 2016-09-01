'use strict';
var app = angular.module("demoapp", ["ui-leaflet"]);
app.controller("GeoJSONController", ['$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
        angular.extend($scope, {
          japan: {
            lat: 31,
            lng: 34,
            zoom: 11
          },
          defaults: {
            scrollWheelZoom: true
          }
        });
        // Get the countries geojson data from a JSON
        $http.get("data.geojson").success(function(data, status) {
          angular.extend($scope, {
            geojson: {
              data: data,
              style: {
                fillColor: "green",
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                onEachFeature: function(feature, layer) {

                }
              }
            },
            japan: {
              lat: data.features[0].geometry.coordinates[1],
              lng: data.features[0].geometry.coordinates[0],
              zoom: 11
            },
            events: {
              map: {
                enable: ['zoomstart', 'drag', 'click', 'mousemove'],
                logic: 'emit'
              }

            }
          });


          $scope.eventDetected = "No events yet...";

          $scope.$on('leafletDirectiveMap.zoomstart', function(event) {
            $scope.eventDetected = "ZoomStart";
          });

          $scope.$on('leafletDirectiveMap.drag', function(event) {
            $scope.eventDetected = "Drag";
          });

          $scope.$on('leafletDirectiveMap.click', function(event) {
            $scope.eventDetected = "Click";
          });

          $scope.$on('leafletDirectiveMap.mousemove', function(event) {
            $scope.eventDetected = "MouseMove";
          });
    });
  }]);
