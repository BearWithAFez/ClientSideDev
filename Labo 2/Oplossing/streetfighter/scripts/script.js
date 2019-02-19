let app = new Vue({
	el: '#fighter',
	data: {
		ken: {
			maxhp: 100, // Maximum health
			hp: 100, // Current health
			power: 20, // Damage per attack
			state: 0, // 0 is idle, 1 is attacking
			style: {
				char: {
					background: '',
					height: '',
					width: ''
				},
				health: {
					backgroundSize: '0% 100%'
				}
			},
			idle: {
				sprite: 'ken.png', //img src
				top: 10, // px from top
				height: 180,
				steps: [10, 110, 210, 310], // translation to right o.e. frame
				width: [90, 90, 90, 90], // w. of each frame
				currentIteration: 0, // Current animation step
				currentProgress: 0 // how many milisec the animation is going for
			},
			attack: {
				sprite: 'ken.png',
				top: 210,
				height: 180,
				steps: [10, 110, 218, 376, 491],
				width: [90, 100, 155, 100, 90],
				currentIteration: 0,
				currentProgress: 0
			}
		},
		deejay: {
			maxhp: 100,
			hp: 100,
			power: 25,
			state: 0,
			style: {
				char: {
					background: '',
					height: '',
					width: ''
				},
				health: {
					backgroundSize: '0% 100%'
				}
			},
			idle: {
				sprite: 'deejay.png',
				top: 10,
				height: 200,
				steps: [10, 122, 233, 347],
				width: [105, 105, 105, 105],
				currentIteration: 0,
				currentProgress: 0
			},
			attack: {
				sprite: 'deejay.png',
				top: 225,
				height: 200,
				steps: [22, 130, 276, 432, 588],
				width: [110, 150, 150, 150, 150],
				currentIteration: 0,
				currentProgress: 0
			}
		},
		winner: {
			style: {
				color: 'red'
			},
			name: '',
			colours: ['yellow', 'red'],
			colourIdx: 0
		},
		gameClass: false,
		gameOverClass: true
	},
	methods: {
		kenAttack: function(event) {
			// Reset animation and set state to attacking
			this.$data.ken.state = 1
			this.$data.ken.attack.currentProgress = 0
		},
		deejayAttack: function(event) {
			// Reset animation and set state to attacking
			this.$data.deejay.state = 1
			this.$data.deejay.attack.currentProgress = 0
		},
		showWinner: function(winner) {
			// Hide the game and show gameover screen with correct name
			let self = this.$data
			self.winner.name = winner
			self.gameClass = true
			self.gameOverClass = false

			// Fun little name animation (optional)
			setInterval(function() {
				self.winner.style.color = self.winner.colours[self.winner.colourIdx]
				self.winner.colourIdx = self.winner.colourIdx == self.winner.colours.length - 1 ? 0 : self.winner.colourIdx + 1
			}, 500)
		}

	},
	watch: {
		'ken.hp': function() {
			// If hp changes animate it
			let ken = this.$data.ken
			let damage = 100 - 100 * ken.hp / ken.maxhp // damage is health lost
			ken.style.health.backgroundSize = damage + '% 100%'
			if (ken.hp <= 0) this.showWinner('Deejay')
		},
		'deejay.hp': function() {
			// If hp changes animate it
			let deejay = this.$data.deejay
			let damage = 100 - 100 * deejay.hp / deejay.maxhp // damage is health lost
			deejay.style.health.backgroundSize = damage + '% 100%'
			if (deejay.hp <= 0) this.showWinner('Ken')
		},
		'ken.attack.currentIteration': function() {
			// Check if attack animation is at the end, and if so reset and deal damage
			let ken = this.$data.ken
			let deejay = this.$data.deejay
			if (ken.state == 1 && ken.attack.currentIteration == ken.attack.steps.length - 1) {
				ken.state = 0
				ken.idle.currentProgress = 0
				deejay.hp -= ken.power
			}
		},
		'deejay.attack.currentIteration': function() {
			// Check if attack animation is at the end, and if so reset and deal damage
			let ken = this.$data.ken
			let deejay = this.$data.deejay
			if (deejay.state == 1 && deejay.attack.currentIteration == deejay.attack.steps.length - 1) {
				deejay.state = 0
				deejay.idle.currentProgress = 0
				ken.hp -= deejay.power
			}
		}
	}
});

;
(function() {
	// Global vars
	var lastRender = 0

	function update(progress) {
		// decalre if attack or defending
		let ken = app.ken.state == 0 ? app.ken.idle : app.ken.attack
		let deejay = app.deejay.state == 0 ? app.deejay.idle : app.deejay.attack

		// declare current progress of animation and step
		ken.currentProgress = (progress + ken.currentProgress) % 1000
		ken.currentIteration = Math.floor(ken.currentProgress / (1000 / ken.steps.length))
		deejay.currentProgress = (progress + deejay.currentProgress) % 1000
		deejay.currentIteration = Math.floor(deejay.currentProgress / (1000 / deejay.steps.length))

		// Change the properties in the app
		app.ken.style.char.width = ken.width[ken.currentIteration] + "px"
		app.ken.style.char.height = ken.height + "px"
		app.ken.style.char.background = "url(images/" + ken.sprite + ") -" + ken.steps[ken.currentIteration] + "px -" + ken.top + "px";

		app.deejay.style.char.width = deejay.width[deejay.currentIteration] + "px"
		app.deejay.style.char.height = deejay.height + "px"
		app.deejay.style.char.background = "url(images/" + deejay.sprite + ") -" + deejay.steps[deejay.currentIteration] + "px -" + deejay.top + "px";
	}

	function loop(timestamp) {
		// Game loop
		update(timestamp - lastRender) // miliseconds passed
		lastRender = timestamp
		window.requestAnimationFrame(loop)
	}

	window.onload = function() {
		window.requestAnimationFrame(loop)
	};
})();