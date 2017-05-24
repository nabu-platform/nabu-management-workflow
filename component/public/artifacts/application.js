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
		
		var createDashboard = function(connectionId, counter) {
			$services.swagger.execute("nabu.management.workflow.rest.instance.dashboard", { connectionId : connectionId }).then(function(result) {
				$services.manager.dashboard({
					alias: "workflowDashboard",
					parameters: {
						results: result.entries,
						connectionId: connectionId
					},
					id: connectionId,
					index: index,
					counter: counter
				})
			});
		};
		
		var counter = 0;
		for (var i = 0; i < connections.length; i++) {
			createDashboard(connections[i], counter++);
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