<template id="workflowSearch">
	<div class="workflowSearch">
		<div class="search-menu page-menu">
			<h1 class="title">Search Workflows</h1>
			
			<div class="actions">
				<button class="neutral" @click="showFilter = !showFilter"><span class="n-icon n-icon-filter"></span><span>Filter</span></button>
			
				<div class="optional" v-show="showFilter" v-auto-close="function() { showFilter = false }">
					<div class="filter">
						<span class="label">Connection</span>
						<select v-model="search.connectionId" class="connectionId">
							<option v-for="connectionId in connections" v-bind:value="connectionId">{{ connectionId }}</option>
						</select>
					</div>
					<div class="filter">
						<span class="label">Definition</span>
						<select v-model="search.definitionId" class="definitionId">
							<option v-bind:value="null">-- ALL WORKFLOWS --</option>
							<option v-for="definition in connectionDefinitions" v-bind:value="definition.definitionId">{{ definition.definitionId }}</option>
						</select>
					</div>
					<div class="filter">
						<span class="label">Transition State</span>
						<select v-model="search.transitionState" class="transitionState">
							<option v-bind:value="null">-- ALL STATES --</option>
							<option v-for="transitionState in transitionStates" v-bind:value="transitionState">{{ transitionState }}</option>
						</select>
					</div>
					<div class="filter">
						<span class="label">Worflow State</span>
						<select v-bind:disabled="search.definitionId == null" v-model="search.stateId" class="stateId">
							<option v-bind:value="null">-- ALL --</option>
							<option v-for="state in states" v-bind:value="state.id">{{ state.name }}</option>
						</select>
					</div>
					<div class="filter">
						<span class="label">From</span>
						<input type="text" v-model="search.from" placeholder="From" class="from" @keydown.down="increment(-1, $event)" @keydown.up="increment(1, $event)"/>
					</div>
					<div class="filter">
						<span class="label">To</span>
						<input type="text" v-model="search.until" placeholder="Until" class="to" @keydown.down="increment(-1, $event)" @keydown.up="increment(1, $event)"/>
					</div>
					<div class="filter">
						<span class="label">Workflow Type</span>
						<input type="text" v-model="search.workflowType" placeholder="Workflow Type" class="id workflowType"/>
					</div>
					<div class="filter">
						<span class="label">Workflow Id</span>
						<input type="text" v-model="search.workflowId" placeholder="Workflow Id" class="id workflowId"/>
					</div>
					<div class="filter">
						<span class="label">Running</span>
						<n-form-switch v-model="search.running" />
					</div>
					<div class="filter">
						<span class="label">Correlation Id</span>
						<input type="text" v-model="search.correlationId" placeholder="Correlation Id" class="id correlationId"/>
					</div>
					<div class="filter">
						<span class="label">Group Id</span>
						<input type="text" v-model="search.groupId" placeholder="Group Id" class="id groupId"/>
					</div>
					<div class="filter">
						<span class="label">Context Id</span>
						<input type="text" v-model="search.contextId" placeholder="Context Id" class="id contextId"/>
					</div>
					<div class="filter">
						<span class="label">Parent Id</span>
						<input type="text" v-model="search.parentId" placeholder="Parent Id" class="id parentId"/>
					</div>
					<div class="filter">
						<span class="label">Batch Id</span>
						<input type="text" v-model="search.batchId" placeholder="Batch Id" class="id batchId"/>
					</div>
					<div class="filter">
						<span class="label">Environment</span>
						<input type="text" v-model="search.environment" placeholder="Environment" class="id environment"/>
					</div>
					<div class="actions">
						<button class="good" v-on:click="get(false)">Search</button>
						<button v-on:click="clear()">Clear Filters</button>
					</div>
				</div>
			</div>
			
		</div>
		<div class="search-results">
			<table cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<td v-if="showId">Id</td>
						<td>Definition</td>
						<td>Started</td>
						<td>Stopped</td>
						<td>State</td>
						<td>Level</td>
						<td>Parent</td>
						<td>Batch</td>
						<td>Type</td>
						<td>Context</td>
						<td>Group</td>
						<td>Correlation</td>
						<td>Environment</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="workflow in workflows">
						<td v-if="showId"><a class="external" v-route:workflowDetail="{ definitionId: workflow.definitionId, workflowId: workflow.id}">{{ workflow.id }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.definitionId = workflow.definitionId">{{ workflow.definitionId }}</a></td>
						<td>{{ formatDateTime(workflow.started) }}</td>
						<td>{{ formatDateTime(workflow.stopped) }}</td>
						<td>{{ formatState(workflow.stateId) }}</td>
						<td v-bind:class="{ 'bad': workflow.transitionState == 'ERROR' }"><a v-bind:class="{ 'bad': workflow.transitionState == 'ERROR' }" href="javascript:void(0)" v-on:click="search.transitionState = workflow.transitionState">{{ workflow.transitionState }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.parentId = workflow.parentId">{{ workflow.parentId }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.batchId = workflow.batchId">{{ workflow.batchId }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.workflowType = workflow.workflowType">{{ workflow.workflowType }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.contextId = workflow.contextId">{{ workflow.contextId }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.groupId = workflow.groupId">{{ workflow.groupId }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.correlationId = workflow.correlationId">{{ workflow.correlationId }}</a></td>
						<td><a href="javascript:void(0)" v-on:click="search.environment = workflow.environment">{{ workflow.environment }}</a></td>
						<td>
							<!--<a title="View Workflow" href="/#/workflow/{{ workflow.definitionId }}/instance/{{ workflow.id }}"><img src="${server.root()}resources/images/icons/workflow-view.png"/></a>-->
							<a title="View Workflow" href="javascript:void(0)" v-on:click="$services.router.route('workflowDetail', { definitionId: workflow.definitionId, workflowId: workflow.id, embedded: true }, 'workflow-detail', true)"><img src="${server.root()}resources/images/icons/workflow-view.png"/></a>
							<a title="Download Attachment" :href="'${server.root()}api/workflow/attachment/' + workflow.uri" v-if="workflow.uri != null"><img src="${server.root()}resources/images/icons/workflow-attachment.png"/></a>
							<a title="Set to failed" href="javascript:void(0)" v-on:click="fail(workflow)" v-show="workflow.transitionState == 'ERROR'"><img src="${server.root()}resources/images/icons/failed.png"/></a>
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="14">
							<input class="limit" type="number" v-model="search.limit"/><button v-on:click="more">Load More</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div id="workflow-detail"></div>
	</div>
</template>