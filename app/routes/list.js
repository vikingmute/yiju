import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
	model: function() {
		var listUrl = apis.list;
		var usersUrl = apis.users;
		return Ember.RSVP.hash({
			songs: Ember.$.getJSON(listUrl),
			//users: Ember.$.getJSON(usersUrl)
		});
	},

	setupController: function(controller, model) {
		controller.set('songs', model.songs);
		var userSession = this.get('session').get('username');
		if (userSession) {
			controller.set('loginSession', true);
			controller.set('username', userSession);
		} else {
			controller.set('loginSession', false);
		}
		//controller.set('users', models.users);
	}
});
