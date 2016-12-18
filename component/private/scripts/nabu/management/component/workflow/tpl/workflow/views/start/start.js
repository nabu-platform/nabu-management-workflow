application.views.WorkflowStart = Vue.extend({
	template: "#workflowStart",
	data: function() {
		return {
			definition: null,
			transition: null,
			files: [],
			definitions: [],
			workflows: []
		}
	},
	activate: function(done) {
		var self = this;
		nabu.utils.ajax({
			method: "get",
			url: "${server.root()}api/workflow/definition",
			success: function(response) {
				var definitions = JSON.parse(response.responseText);
				nabu.utils.arrays.merge(self.definitions, definitions.workflows);
				done();
			}
		})	
	},
	methods: {
		start: function() {
			var self = this;
			if (self.definition != null) {
				self.workflows.splice(0, self.workflows.length);
				if (this.files.length > 0) {
					for (var i = 0; i < this.files.length; i++) {
						nabu.utils.ajax({
							method: "post",
							url: "${server.root()}api/workflow/" + self.definition + "/instance" + (self.transition ? "?transitionId=" + self.transition : ""),
							data: self.files[i],
							success: function(response) {
								var result = JSON.parse(response.responseText);
								if (result.workflowId) {
									self.workflows.push(result.workflowId);
								}
							}
						});
					}
				}
				else {
					nabu.utils.ajax({
						method: "post",
						url: "${server.root()}api/workflow/" + self.definition + "/instance" + (self.transition ? "?transitionId=" + self.transition : ""),
						success: function(response) {
							var result = JSON.parse(response.responseText);
							if (result.workflowId) {
								self.workflows.push(result.workflowId);
							}
						}
					});
				}
			}
		},
		selectFiles: function(event) {
			var files = event.target.files || event.dataTransfer.files;
			if (files) {
				this.files.splice(0, this.files.length);
				// files is a "FileList" object: https://developer.mozilla.org/en-US/docs/Web/API/FileList
				for (var i = 0; i < files.length; i++) {
					this.files.push(files.item(i));
				}
			}
		}
	},
	computed: {
		transitions: function() {
			if (this.definition != null) {
				for (var i = 0; i < this.definitions.length; i++) {
					if (this.definitions[i].definitionId == this.definition) {
						var initialStates = {};
						var targetedStates = [];
						for (var j = 0; j < this.definitions[i].states.length; j++) {
							initialStates[this.definitions[i].states[j].id] = this.definitions[i].states[j];
							for (var k = 0; k < this.definitions[i].states[j].transitions.length; k++) {
								targetedStates.push(this.definitions[i].states[j].transitions[k].targetStateId);
							}
						}
						var transitions = [];
						var keys = Object.keys(initialStates);
						for (var j = 0; j < keys.length; j++) {
							if (targetedStates.indexOf(keys[j]) < 0) {
								nabu.utils.arrays.merge(transitions, initialStates[keys[j]].transitions);
							}
						}
						return transitions;
					}
				}
			}
		}
	},
	watch: {
		definition: function() {
			this.workflows.splice(0, this.workflows.length);
		}
	}
});