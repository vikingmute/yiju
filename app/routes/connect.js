import Ember from 'ember';
export default Ember.Route.extend({
	urlToObj: function(str) {
		var obj = {}, strPrams;
		if (str.indexOf('?') !== -1) {
			strPrams = str.split('?')[1].split('&');
			strPrams.forEach(function(item, index) {
				var tempArr = item.split('=');
				var key = tempArr[0];
				var value = tempArr[1];
				obj[key] = value;
			});
		}
		return obj;
	},
	model: function() {
        var url = this.get('router.url');
        if (url.indexOf('code') !== -1) {
        	var obj = this.urlToObj(url);
        	return Ember.$.getJSON('http://127.0.0.1:5000/connect/' + obj.code);
        } else if (url.indexOf('error') !== -1) {
        	this.transitionTo('list');

        } else {
        	this.transitionTo('list');
        }
	},
	actions: {
		signup: function(user) {
			var data = {
				name: user.name,
				password: user.password,
				avatar: user.avatar
			};
			Ember.$.ajax({
				type: 'POST',
				url: 'http://127.0.0.1:5000/adduser/',
				data: data
			}).then(function(data) {
				console.log(data);
			});
		}
	},
	setupController: function(controller, model) {
		controller.set('user', model);
	}
});