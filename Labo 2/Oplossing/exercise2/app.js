new Vue({
	el: '#exercise',
	data: {
		value: '',
		Input1: '',
		Input2: ''
	},
	methods: {
		Alert: function(event) {
			alert('Hello there! - General Kenobi.')
		},
		Save: function(event) {
			// Use this.$data to get the data INSIDE the vue app.
			this.$data.value = this.$data.Input1
		},
		Enter: function(event) {
			this.$data.value = this.$data.Input2
		}
	}
});