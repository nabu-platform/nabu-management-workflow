<template id="workflowDashboard">
	<h1>Workflows</h1>
	<p>{{ connectionId }}</p>
	<div class="workflow-dashboard-chart {{ className }}"></div>
	<ul>
		<li><span class="legend errors"></span><span class="value">{{ errors }}</span><span class="key"> Errors</span></li>
		<li><span class="legend running"></span><span class="value">{{ running }}</span><span class="key"> Running</span></li>
		<li><span class="legend success"></span><span class="value">{{ success }}</span><span class="key"> Succeeded</span></li>
		<li><span class="legend failed"></span><span class="value">{{ failed }}</span><span class="key"> Failed</span></li>
	</ul>
	<p class="dashboard-footer">{{ errors + running + success + failed }}</p>
</template>