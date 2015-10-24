Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
    Template.map.onCreated(function() {
        GoogleMaps.ready('map', function(map) {
            google.maps.event.addListener(map.instance, 'click', function(event) {
                Markers.insert({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                });
            });

            var markers = {};
			
			var ctaLayer = new google.maps.KmlLayer({
			   url: 'https://dl.dropboxusercontent.com/u/7958625/ElizabethRiverTrail.kml.xml',
			   map: map.instance
			 });
			
            Markers.find().observe({
                added: function(document) {
                    var marker = new google.maps.Marker({
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(document.lat, document.lng),
                        map: map.instance,
                        id: document._id
                    });

                    google.maps.event.addListener(marker, 'dragend', function(event) {
                        Markers.update(marker.id, {
                            $set: {
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            }
                        });
                    });

                    markers[document._id] = marker;
                },
                changed: function(newDocument, oldDocument) {
                    markers[newDocument._id].setPosition({
                        lat: newDocument.lat,
                        lng: newDocument.lng
                    });
                },
                removed: function(oldDocument) {
                    markers[oldDocument._id].setMap(null);
                    google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
                    delete markers[oldDocument._id];
                }
            });
        });
    });
    //client code
    Meteor.startup(function() {
        GoogleMaps.load();

    });

    Template.body.helpers({
        exampleMapOptions: function() {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
  
                var options = {
                    center: new google.maps.LatLng(36.8, -76.285),
                    //center: new google.maps.LatLng(41.876, -87.624),
                    zoom: 10
                };				
				return options;
            }

        }
    });
}
	if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
}
	
