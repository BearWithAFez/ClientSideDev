new Vue({
    el: '#exercise',
    data: {
        value: 0
    },
    computed: {
    	result: function() {
    		if (this.$data.value != 37){
    			return 'not there yet'
    		}
    		else{
    			return 'done'
    		}
    	}
    },
    watch: {
    	result: function() {
    		var self = this.$data
    		setTimeout( function() { 
    			self.value = 0 
    		}, 5000)
    	}
    }
});
