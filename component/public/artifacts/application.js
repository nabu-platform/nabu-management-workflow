application.configuration.modules.push(function($services) {
	$services.manager.menu({
		title: "Workflows",
		actions: [{
			title: "Search",
			handler: function() {
				application.services.router.route("workflowSearch");
			}
		}, {
			title: "Start New",
			handler: function() {
				application.services.router.route("workflowStart");
			}
		}]
	});
	var index = $services.manager.index();
	
	$services.swagger.execute("nabu.management.workflow.rest.definition.list").then(function(result) {
		var connections = [];
		if (result.workflows) {
			for (var i = 0; i < result.workflows.length; i++) {
				if (result.workflows[i].connectionId && connections.indexOf(result.workflows[i].connectionId) < 0) {
					connections.push(result.workflows[i].connectionId);
				}
			}
		}
		// predictable order
		connections.sort();
		for (var i = 0; i < connections.length; i++) {
			$services.manager.dashboard({
				alias: "workflowDashboard",
				parameters: {
					connectionId: connections[i]
				},
				id: connections[i],
				index: index
			})
		}
	});
	
	$services.router.register({
		alias: "workflowSearch",
		enter: function() {
			return new application.views.WorkflowSearch();
		},
		url: "/workflow/search"
	});

	$services.router.register({
		alias: "workflowDetail",
		enter: function(parameters) {
			return new application.views.WorkflowDetail({ data: parameters });
		},
		url: "/workflow/{definitionId}/instance/{workflowId}"
	});

	$services.router.register({
		alias: "workflowStart",
		enter: function(parameters) {
			return new application.views.WorkflowStart();
		},
		url: "/workflow/start"
	});

	$services.router.register({
		alias: "workflowDashboard",
		enter: function(parameters) {
			return new application.views.WorkflowDashboard({ data: parameters });
		}
	});
});