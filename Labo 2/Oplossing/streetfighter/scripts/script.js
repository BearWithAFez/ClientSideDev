let app = new Vue({ 
	el: '#fighter',
	data: {
		ken:{
			maxhp: 100,
			hp: 100,
			power: 20,
			state: 0,
			style: {
				char: {
					background: '',
					height: '',
					width: ''
				},
				health:{
					backgroundSize: '0% 100%'
				}
			},
			idle: {
				sprite: 'ken.png', //img src
				top: 10, // px from top
				height: 180,
				steps: [10, 110, 210, 310], // translation to right o.e. frame
				width: [90, 90, 90, 90], // w. of each frame
				currentIteration: 0,
				currentProgress: 0
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
		deejay:{
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
				health:{
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
			style:{
				color: 'red'
			},
			name: '',
			colours: ['yellow','red'],
			colourIdx: 0
		},
		gameClass: false,
		gameOverClass: true
	},
	methods: {
		kenAttack: function (event) {
			let ken = this.$data.ken
			ken.state = 1
			ken.attack.currentProgress = 0
		},
		deejayAttack: function (event) {
			let deejay = this.$data.deejay
			deejay.state = 1
			deejay.attack.currentProgress = 0
		},
		showWinner: function(winner){
			let self = this.$data
			self.winner.name = winner
			self.gameClass = true
			self.gameOverClass = false
			
			setInterval( function() { 
				self.winner.style.color = self.winner.colours[self.winner.colourIdx]
				self.winner.colourIdx = self.winner.colourIdx == self.winner.colours.length-1 ? 0 : self.winner.colourIdx + 1
			},500)
		}

	},
	watch: {
		'ken.hp': function(){
			let ken = this.$data.ken
			let damage = 100 - 100 * ken.hp / ken.maxhp
			ken.style.health.backgroundSize = damage + '% 100%'

			if (ken.hp <= 0) this.showWinner('Deejay')
		},
		'deejay.hp': function(){			
			let deejay = this.$data.deejay
			let damage = 100 - 100 * deejay.hp / deejay.maxhp
			deejay.style.health.backgroundSize = damage + '% 100%'

			if (deejay.hp <= 0) this.showWinner('Ken')
		},
		'ken.attack.currentIteration': function(){
			let ken = this.$data.ken
			let deejay = this.$data.deejay
			if (ken.state == 1 && ken.attack.currentIteration == ken.attack.steps.length-1){
				ken.state = 0
				ken.idle.currentProgress = 0
				deejay.hp -= ken.power
			}
		},
		'deejay.attack.currentIteration': function(){
			let ken = this.$data.ken
			let deejay = this.$data.deejay
			if (deejay.state == 1 && deejay.attack.currentIteration == deejay.attack.steps.length-1){
				deejay.state = 0
				deejay.idle.currentProgress = 0
				ken.hp -= deejay.power
			}
		}
	}
});


;(function () {	
	// Global vars
	var lastRender = 0

	function update(progress) {
		// decalre if attack or defending
		let ken = app.ken.state == 0? app.ken.idle : app.ken.attack
		let deejay = app.deejay.state == 0? app.deejay.idle : app.deejay.attack

		// declare current timestep
		deejay.currentProgress = (progress + deejay.currentProgress)%1000
		ken.currentProgress = (progress + ken.currentProgress)%1000

		ken.currentIteration = Math.floor(ken.currentProgress / (1000/ken.steps.length))        
		deejay.currentIteration = Math.floor(deejay.currentProgress / (1000/deejay.steps.length))

		app.ken.style.char.width = ken.width[ken.currentIteration] + "px"
		app.ken.style.char.height = ken.height + "px"
		app.ken.style.char.background = "url(images/" + ken.sprite + ") -" + ken.steps[ken.currentIteration] + "px -" + ken.top + "px";

		app.deejay.style.char.width = deejay.width[deejay.currentIteration] + "px"
		app.deejay.style.char.height = deejay.height + "px"
		app.deejay.style.char.background = "url(images/" + deejay.sprite + ") -" + deejay.steps[deejay.currentIteration] + "px -" + deejay.top + "px";
	}


	function loop(timestamp) {
		let progress = timestamp - lastRender
		update(progress)
		lastRender = timestamp
		window.requestAnimationFrame(loop)
	}

	window.onload = function() {    
		window.requestAnimationFrame(loop)
	};
})();
 