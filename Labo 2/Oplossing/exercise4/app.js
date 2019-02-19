new Vue({
	el: '#exercise',
	data: {
		isActive: true,
		isHighlighted: false,
		isShrunk: false,
		whackClass: 'whack',
		blueClass: 'blue',
		fluidClass: '',
		Input1: '',
		Input2: '',
		progressPercent: 0,
		fluidStyle: {
			width: '100px',
			height: '100px',
			backgroundColor: 'pink'
		},
		progressStyle: {
			width: '100px',
			height: '20px',
			border: '1px solid black',
			backgroundSize: '0% 100%',
			backgroundRepeat: 'no-repeat',
			backgroundImage: "url('https://ittybittydragon.com/wp-content/uploads/2017/07/Neon-Green-170726.jpg')"
		}
	},
	methods: {
		startEffect: function() {
			var self = this.$data
			setInterval(function() {
				// Flip.
				self.isHighlighted = self.isShrunk
				self.isShrunk = !self.isHighlighted
			}, 1000);
		},
		Alter1: function() {
			this.$data.fluidClass = this.$data.Input1
		},
		Alter2: function() {
			this.$data.fluidStyle.backgroundColor = this.$data.Input2
		},
		startProgress: function() {
			var self = this.$data
			setInterval(function() {
				self.progressPercent == ++self.progressPercent % 101
				self.progressStyle.backgroundSize = self.progressPercent + '% 100%'
			}, 50);
		}
	}
});