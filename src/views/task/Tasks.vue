<template>
	<v-container>
		<v-container>
			<v-row>
				<v-col cols="12">
					<draggable
						v-model="active"
						class="row"
						@change="changeRecent"
						group="kanban"
					>
						<v-card width="100%" class="mt-2 mb-2">
							<v-card-text>
								{{ activeTask.nome }}
							</v-card-text>
						</v-card>
					</draggable>
				</v-col>
				<v-col cols="6">
					<v-row>
						<v-col cols="12">Recentes</v-col>
						<v-col>
							<draggable
								v-model="recents"
								class="row"
								@change="changeRecent"
								group="kanban"
								height="100%"
							>
								<v-card
									width="100%"
									class="ma-2"
									v-for="item in recents"
									:key="item.id"
									:color="item.cor"
								>
									<v-card-text>
										{{ item.nome }}
									</v-card-text>
								</v-card>
							</draggable>
						</v-col>
					</v-row>
				</v-col>
				<v-col>
					<v-row>
						<v-col cols="12">finisheds</v-col>
						<v-col>
							<draggable
								v-model="finisheds"
								class="row"
								@change="changeFinish"
								group="kanban"
								height="100%"
							>
								<v-card
									width="100%"
									class="ma-2"
									v-for="item in finisheds"
									:key="item.id"
									:color="item.cor"
								>
									<v-card-text>
										{{ item.nome }}
									</v-card-text>
								</v-card>
							</draggable>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions, mapState } from "vuex";
import { Status } from "../../model/task";
export default {
	name: "Tasks",

	components: {
		draggable,
	},

	data: () => ({
		recents: [],
		finisheds: [],
		active: [],
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
	},

	created() {
		this.ActionGetActive();
		this.ActionFilterRecenteTasks().then((result) => {
			this.recents = result;
		});
		this.ActionFilterFinishedTask().then((result) => {
			this.finisheds = result;
		});
	},
};
</script>