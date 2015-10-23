if (Meteor.isClient) {
  //client code

  Template.temp.events({
	  //event handling
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
