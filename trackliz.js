if (Meteor.isClient) {
  //client code
	Meteor.startup(function() {
    GoogleMaps.load();
  });
  Template.temp.events({
	  //event handling
  });

	Template.body.helpers({
		exampleMapOptions: function() {
		  // Make sure the maps API has loaded
		  if (GoogleMaps.loaded()) {
		    // Map initialization options
		    return {
		      center: new google.maps.LatLng(36.850769, -76.285873),
		      zoom: 12
		    };
		  }
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

