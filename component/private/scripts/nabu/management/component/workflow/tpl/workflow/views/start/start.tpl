<template id="workflowStart">
	<div class="start">
		<select v-model="definition">
			<option v-bind:value="null">-- CHOOSE --</option>
			<option v-for="definition in definitions" v-bind:value="definition.definitionId">{{ definition.definitionId }}</option>
		</select>
		<select v-model="transition" :disabled="definition == null">
			<option v-bind:value="null">-- CHOOSE --</option>
			<option v-for="transition in transitions" v-bind:value="transition.definitionId">{{ transition.name }}</option>
		</select>
		<input type="file" multiple="multiple" :disabled="definition == null" v-on:change="selectFiles"/>
		<button v-on:click="start()">Start</button>
	</div>
	<div class="created">
		<ul>
			<li v-for="workflow in workflows">Created: <a href="javascript:void(0)" v-on:click="$application.services.router.route('workflowDetail', { definitionId: definition, workflowId: workflow }, 'workflow-detail', true)">{{ workflow }}</a></li>
		</ul>
	</div>
	<div id="workflow-detail"></div>
</template>