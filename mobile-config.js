// basic info
App.info({
  name: 'trakliz',
  description: 'Elizabeth River Trail App',
  author: '',
  email: '',
  website: 'http:'
});

// CORS for Meteor app
App.accessRule('meteor.local/*');
// allow tiles
App.accessRule('*.openstreetmap.org/*');
App.accessRule('*.tile.thunderforest.com/*');
