application.services.router.register({
	alias: "workflowSearch",
	enter: function() {
		return new application.views.WorkflowSearch();
	},
	url: "/workflow/search"
});

application.services.router.register({
	alias: "workflowDetail",
	enter: function(parameters) {
		return new application.views.WorkflowDetail({ data: parameters });
	},
	url: "/workflow/{definitionId}/instance/{workflowId}"
});

application.services.router.register({
	alias: "workflowStart",
	enter: function(parameters) {
		return new application.views.WorkflowStart();
	},
	url: "/workflow/start"
});
