application.views.WorkflowDashboard = Vue.extend({
	props: ["connectionId"],
	template: "#workflowDashboard",
	data: function() {
		return {
			results: [],
			errors: 0,
			failed: 0,
			success: 0,
			running: 0
		}
	},
	activate: function(done) {
		var self = this;
		nabu.utils.ajax({
			method: "get",
			url: "${server.root()}api/workflow/dashboard?connectionId=" + self.connectionId,
			success: function(response) {
				nabu.utils.arrays.merge(self.results, JSON.parse(response.responseText).entries);
				done();
			}
		})
	},
	ready: function() {
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
		
		new Chartist.Pie("." + this.className, data, options);
	},
	computed: {
		className: function() {
			return this.connectionId.replace(/\./g, "-");
		}
	}
});