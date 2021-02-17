<template>
	<v-row>
		<v-col cols="12" class="pa-0">
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
					<small> finished </small>
					<v-icon>mdi-text-box-check-outline </v-icon>
				</v-tab>
			</v-tabs>
		</v-col>
		<v-col cols="12">
			<v-tabs-items v-model="tab">
				<v-tab-item :value="'tab-1'">
					<HistoryCard
						v-for="item in recentTasks"
						:key="item.id"
						:task="item"
						@task-excluida="tarefaExcluida"
					>
						<HistoryTabs :color="item.bg" :id="item.id" />
					</HistoryCard>
				</v-tab-item>

				<v-tab-item :value="'tab-2'">
					<template v-if="hasActive()">
						<HistoryCard
							:task="activeTask"
							@task-excluida="tarefaExcluida"
						>
							<HistoryTabs
								:color="activeTask.bg"
								:id="activeTask.id"
							/>
						</HistoryCard>
					</template>
				</v-tab-item>

				<v-tab-item :value="'tab-3'">
					<HistoryCard
						v-for="item in finishedTask"
						:key="item.id"
						:task="item"
						@task-excluida="tarefaExcluida"
					>
						<HistoryTabs :color="item.bg" :id="item.id" />
					</HistoryCard>
				</v-tab-item>
			</v-tabs-items>
		</v-col>
	</v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
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
		...mapGetters("home", ["hasActive"]),

		...mapActions("home", [
			"ActionFilterRecenteTasks",
			"ActionGetActive",
			"ActionFilterFinishedTask",
		]),

		tarefaExcluida(id) {
			this.ActionFilterRecenteTasks();
			this.ActionGetActive();
			this.ActionFilterFinishedTask();
		},
	},
	mounted() {
		this.ActionFilterRecenteTasks();
		this.ActionGetActive();
		this.ActionFilterFinishedTask();
	},
};
</script>



