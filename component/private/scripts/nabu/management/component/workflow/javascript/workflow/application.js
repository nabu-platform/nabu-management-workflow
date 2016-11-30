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
});