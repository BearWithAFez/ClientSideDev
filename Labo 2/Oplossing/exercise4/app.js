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
    	setInterval( function() { 
    		if (self.isHighlighted){
	    		self.isHighlighted = false
	    		self.isShrunk = true
	    	} else {
	    		self.isHighlighted = true
	    		self.isShrunk = false
	    	}
    	}, 1000);    	
    },
    Alter1: function() {
    	var self = this.$data
    	self.fluidClass = self.Input1
    },
    Alter2: function() {
    	var self = this.$data
    	self.fluidStyle.backgroundColor = self.Input2
    },
    startProgress: function() {
    	var self = this.$data
    	setInterval( function() { 
    		if(self.progressPercent == 100) {
    			self.progressPercent = 0
    		} else {    			
    			self.progressPercent++
    		}	
    		self.progressStyle.backgroundSize = self.progressPercent + '% 100%'
    	}, 50);
    }
  }
});
