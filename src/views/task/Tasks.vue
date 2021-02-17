<template>
	<v-row>
		<v-col cols="12">
			<v-alert tile dense text color="orange">
				<div class="title text-center pb-2">Active</div>
				<draggable
					v-model="actives"
					class="row"
					@change="changeActive"
					group="kanban"
				>
					<DragCard
						v-for="item in actives"
						:key="item.id"
						:task="item"
					></DragCard>
				</draggable>
			</v-alert>
		</v-col>
		<v-col cols="6">
			<v-alert tile dense text color="blue" min-height="100%">
				<div class="title text-center pb-2">Recent</div>
				<draggable
					v-model="recents"
					class="row kanban-column"
					@change="changeRecent"
					group="kanban"
				>
					<DragCard
						v-for="item in recents"
						:key="item.id"
						:task="item"
					></DragCard>
				</draggable>
			</v-alert>
		</v-col>
		<v-col cols="6">
			<v-alert tile dense text color="green" min-height="100%">
				<div class="title text-center pb-2">Finished</div>

				<draggable
					v-model="finisheds"
					class="row kanban-column"
					@change="changeFinish"
					group="kanban"
				>
					<DragCard
						v-for="item in finisheds"
						:key="item.id"
						:task="item"
					></DragCard>
				</draggable>
			</v-alert>
		</v-col>
	</v-row>
</template>

<script>
import draggable from "vuedraggable";
import DragCard from "../../components/DragCard";
import { mapActions, mapState } from "vuex";
import { Status } from "../../model/task";

export default {
	name: "Tasks",

	components: {
		draggable,
		DragCard,
	},

	data: () => ({
		recents: [],
		finisheds: [],
		actives: [],
	}),

	computed: {
		...mapState("home", ["activeTask", "recentTasks", "finishedTask"]),
	},

	methods: {
		...mapActions("home", [
			"ActionFilterRecenteTasks",
			"ActionGetActive",
			"ActionFilterFinishedTask",
			"ActionUpdateStatus",
			"ActionUpdateActives",
		]),

		changeRecent(e) {
			const { added } = e;
			if (added) {
				this.ActionUpdateStatus({
					id: added.element.id,
					status: Status.RECENTE,
				});
			}
		},
		changeFinish(e) {
			const { added } = e;
			if (added) {
				this.ActionUpdateStatus({
					id: added.element.id,
					status: Status.CONCLUIDO,
				});
			}
		},

		async changeActive(e) {
			const { added } = e;
			if (added) {
				await this.ActionUpdateActives(added.element.id).then(
					(result) => {
						this.actives = [];
						if (result && result.hasOwnProperty("_nome")) {
							this.actives.push(result);
						}
					}
				);
				this.ActionFilterRecenteTasks().then((result) => {
					this.recents = result;
				});
				this.ActionFilterFinishedTask().then((result) => {
					this.finisheds = result;
				});
			}
		},
	},

	created() {
		this.ActionGetActive().then((result) => {
			this.actives = [];
			if (result && result.hasOwnProperty("_nome")) {
				this.actives.push(result);
			}
		});
		this.ActionFilterRecenteTasks().then((result) => {
			this.recents = result;
		});
		this.ActionFilterFinishedTask().then((result) => {
			this.finisheds = result;
		});
	},
};
</script>

<style scoped>
.kanban-column {
	min-height: 300px;
}
</style>