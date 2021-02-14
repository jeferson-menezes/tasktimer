<template>
	<v-container>
		<v-tabs
			v-model="tab"
			background-color="pink"
			centered
			dark
			icons-and-text
		>
			<v-tabs-slider></v-tabs-slider>

			<v-tab href="#tab-1">
				<small> Recents </small>
				<v-icon>mdi-history</v-icon>
			</v-tab>

			<v-tab href="#tab-2">
				<small> Active </small>
				<v-icon>mdi-motion-play</v-icon>
			</v-tab>

			<v-tab href="#tab-3">
				<small> concluido </small>
				<v-icon>mdi-text-box-check-outline </v-icon>
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item :value="'tab-1'">
				<HistoryCard
					v-for="(item, i) in recentTasks"
					:key="i"
					:color="item.cor"
					:title="item.nome"
					:codigo="item.codigo"
				>
					<HistoryTabs :color="item.cor" :id="item.id" />
				</HistoryCard>
			</v-tab-item>

			<v-tab-item :value="'tab-2'">
				<HistoryCard
					:color="activeTask.cor"
					:title="activeTask.nome"
					:codigo="activeTask.codigo"
				>
					<HistoryTabs :color="activeTask.cor" :id="activeTask.id" />
				</HistoryCard>
			</v-tab-item>

			<v-tab-item :value="'tab-3'">
				<HistoryCard
					v-for="(item, i) in finishedTask"
					:key="i"
					:color="item.cor"
					:title="item.nome"
					:codigo="item.codigo"
				>
					<HistoryTabs :color="item.cor" :id="item.id" />
				</HistoryCard>
			</v-tab-item>
		</v-tabs-items>
	</v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import HistoryCard from "../../components/HistoryCard";
import HistoryTabs from "../../components/HistoryTabs";

export default {
	name: "History",

	components: {
		HistoryCard,
		HistoryTabs,
	},

	data: () => ({
		tab: null,
	}),

	computed: {
		...mapState("home", ["recentTasks", "activeTask", "finishedTask"]),
	},

	methods: {
		...mapActions("home", [
			"ActionFilterRecenteTasks",
			"ActionGetActive",
			"ActionFilterFinishedTask",
		]),
	},
	created() {
		this.ActionFilterRecenteTasks();
		this.ActionGetActive();
		this.ActionFilterFinishedTask();
	},
};
</script>



