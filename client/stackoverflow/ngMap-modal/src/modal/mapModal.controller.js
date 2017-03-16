app.controller('mapModalCtrl', function($scope, NgMap) {
    $scope._map = null;
    $scope.geofences = [{
      "name": "circle",
      "lat": 30.45,
      "lng": -91.15,
      radius: 200
    },
    {
      "name": "circle",
      "lat": 30.45,
      "lng": -91.15,
      radius: 500
    },
    {
      "name": "circle",
      "lat": 30.45,
      "lng": -91.15,
      radius: 800
    },
    {
      "name": "circle",
      "lat": 30.45,
      "lng": -91.15,
      radius: 1000
    }
  ];

    $scope.markers = [{
        lat: 30.45,
        lng: -91.15,
        distance: 0,
        duration: 0,
        detail: 'Distance: 0 meter, Duration: 0 min.'
    }];

    $scope.fitBounds = function() {
        for (var shape in $scope._map.shapes) {
            $scope._map.fitBounds($scope._map.shapes[shape].getBounds());
        }
    };

    NgMap.getMap().then(function(map) {
        $scope._map = map;
    
        var center = new google.maps.LatLng(30.45, -91.15);
        var spherical = google.maps.geometry.spherical;


        var service = new google.maps.DistanceMatrixService();

        $scope.geofences.forEach(function(geofence) {
            var target = spherical.computeOffset(center, geofence.radius, -90);

            service.getDistanceMatrix({
                    origins: [center],
                    destinations: [target],
                    travelMode: google.maps.TravelMode.WALKING,
                }, function(response, status) {
                    if (status === google.maps.DistanceMatrixStatus.OK) {
                        $scope.$apply(function() {
                            $scope.markers.push({lat: target.lat(),
                                lng: target.lng(), 
                                distance: response.rows[0].elements[0].distance.text,
                                duration: response.rows[0].elements[0].duration.text,
                                detail: 'Distance: ' + response.rows[0].elements[0].distance.text + ', Duration: ' + response.rows[0].elements[0].duration.text + '.'
                            });
                        });
                    }    
                }
            );
        });
    });
});