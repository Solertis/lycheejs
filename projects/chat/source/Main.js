
lychee.define('app.Main').requires([
	'app.net.Client',
	'app.state.Chat'
]).includes([
	'lychee.app.Main'
]).exports(function(lychee, app, global, attachments) {

	var Class = function(data) {

		var settings = lychee.extend({

			// Is configured by Sorbet API
			client: '/api/Server?identifier=chat',

			input: {
				delay:       0,
				key:         true,
				keymodifier: false,
				touch:       true,
				swipe:       true
			},

			jukebox: {
				channels: 2,
				music:    false,
				sound:    true
			},

			renderer: {
				id:         'anonchat',
				width:      null,
				height:     null,
				background: '#404844'
			},

			viewport: {
				fullscreen: false
			}

		}, data);


		lychee.app.Main.call(this, settings);



		/*
		 * INITIALIZATION
		 */

		this.bind('load', function(oncomplete) {

			this.settings.appclient = this.settings.client;
			this.settings.client    = null;

			oncomplete(true);

		}, this, true);

		this.bind('init', function() {

			var settings = this.settings.appclient || null;
			if (settings !== null) {
				this.client = new app.net.Client(settings, this);
			}

			this.setState('chat', new app.state.Chat(this));

			this.client.bind('connect', function() {
				this.changeState('chat');
			}, this);

		}, this, true);

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			var data = lychee.app.Main.prototype.serialize.call(this);
			data['constructor'] = 'app.Main';

			var settings = data['arguments'][0] || {};
			var blob     = data['blob'] || {};


			if (this.defaults.client !== null) { settings.client = this.defaults.client; }


			data['arguments'][0] = settings;
			data['blob']         = Object.keys(blob).length > 0 ? blob : null;


			return data;

		}

	};


	return Class;

});
