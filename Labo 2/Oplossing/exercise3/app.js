new Vue({
	el: '#exercise',
	data: {
		value: 0
	},
	computed: {
		result: function() {
			return (this.$data.value == 37) ? 'done' : 'not there yet'
		}
	},
	watch: {
		result: function() {
			// altijd values meegeven in een andere var, wegens
			// this verwijst naar de timeout erin.
			var self = this.$data
			setTimeout(function() {
				self.value = 0
			}, 5000)
		}
	}
});