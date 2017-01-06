
lychee.define('lychee.policy.Velocity').exports(function(lychee, global, attachments) {

	/*
	 * IMPLEMENTATION
	 */

	let Composite = function(data) {

		let settings = lychee.assignsafe({
			entity: null,
			limit:  {
				x: Infinity,
				y: Infinity,
				z: Infinity
			}
		}, data);


		this.entity = settings.entity || null;
		this.limit  = settings.limit;

		settings = null;

	};


	Composite.prototype = {

		/*
		 * ENTITY API
		 */

		// deserialize: function(blob) {},

		serialize: function() {

			let settings = {
				entity: null,
				limit:  this.limit
			};


			return {
				'constructor': 'lychee.policy.Velocity',
				'arguments':   [ settings ]
			};

		},



		/*
		 * CUSTOM API
		 */

		sensor: function() {

			let entity = this.entity;
			let limit  = this.limit;
			let values = [ 0.5, 0.5, 0.5 ];


			if (entity !== null) {

				values[0] = entity.velocity.x / limit.x;
				values[1] = entity.velocity.y / limit.y;
				values[2] = entity.velocity.z / limit.z;

			}


			return values;

		},

		control: function(values) {

			let entity = this.entity;
			let limit  = this.limit;
			let x      = values[0] * limit.x;
			let y      = values[1] * limit.y;
			let z      = values[2] * limit.z;


			if (entity !== null) {

				entity.velocity.x = x;
				entity.velocity.y = y;
				entity.velocity.z = z;

			}

		}

	};


	return Composite;

});

