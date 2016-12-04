application.initialize.modules.push(function() {
	application.services.vue.menu.push({
		title: "Workflows",
		children: [{
			title: "Search",
			handle: function() {
				application.services.router.route("workflowSearch");
			}
		}, {
			title: "Start New",
			handle: function() {
				application.services.router.route("workflowStart");
			}
		}]
	});
	var row = application.services.vue.getDashboardRow();
	nabu.utils.ajax({
		method: "get",
		url: "${server.root()}api/workflow/definition",
		success: function(response) {
			var result = JSON.parse(response.responseText);
			var connections = [];
			if (result.workflows) {
				for (var i = 0; i < result.workflows.length; i++) {
					if (result.workflows[i].connectionId && connections.indexOf(result.workflows[i].connectionId) < 0) {
						connections.push(result.workflows[i].connectionId);
					}
				}
			}
			for (var i = 0; i < connections.length; i++) {
				application.services.vue.dashboards.push({
					alias: "workflowDashboard",
					parameters: {
						connectionId: connections[i]
					},
					id: connections[i],
					row: row
				})
			}
		}
	})
	
});