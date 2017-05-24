application.views.WorkflowDashboard = Vue.extend({
	props: ["connectionId"],
	template: "#workflowDashboard",
	data: function() {
		return {
			results: [],
			connectionId: null,
			errors: 0,
			failed: 0,
			success: 0,
			running: 0
		}
	},
	created: function() {
		this.errors = 0;
		this.failed = 0;
		this.success = 0;
		this.running = 0;
	},
	ready: function() {
		if (this.results) {
			for (var i = 0; i < this.results.length; i++) {
				if (this.results[i].transitionState == "ERROR") {
					this.errors += this.results[i].amount;
				}
				else if (this.results[i].transitionState == "FAILED") {
					this.failed += this.results[i].amount;
				}
				else if (this.results[i].transitionState == "SUCCEEDED") {
					this.success += this.results[i].amount;
				}
				else {
					this.running += this.results[i].amount;
				}
			}
		}
		this.draw();
	},
	methods: {
		draw: function() {
			var data = {
				//labels: ["Error", "Failed", "Success", "Running"],
				series: [this.errors, this.failed, this.success, this.running]
			};
			
			var options = {
				labelInterpolationFnc: function(value) {
					return "";
				}
				//labelDirection: 'explode',
				//labelOffset: 75,
				//chartPadding: 50
			};
			
			//new Chartist.Pie("." + this.className, data, options);
			new Chartist.Pie(this.$refs.chart, data, options);
		}	
	},
	computed: {
		className: function() {
			return this.connectionId.replace(/\./g, "-");
		}
	}
});