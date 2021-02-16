<template>
	<v-card :color="task.bg" class="mt-2">
		<v-card-title>
			<v-row dense no-gutters justify="space-between">
				<v-col cols="10">
					<div class="text-truncate subtitle-1 font-weight-medium">{{ task.codigo }} - {{ task.nome }}</div>
				</v-col>
				<v-col cols="auto">
					<v-btn icon :color="task.color" @click="excluir(task.id)">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-actions>
			<v-btn color="orange lighten-2" class="subtitle-2" text @click="show = !show">
				Histórico
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn icon @click="show = !show">
				<v-icon>{{
					show ? "mdi-chevron-up" : "mdi-chevron-down"
				}}</v-icon>
			</v-btn>
		</v-card-actions>
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				<v-card-text>
					<slot></slot>
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "HistoryCard",

	props: {
		task: Object,
	},

	data: () => ({
		show: false,
	}),

	methods: {
		...mapActions("task", ["ActionDeleteTask"]),
		excluir(id) {
			this.$confirm({
				title: "Confirme!",
				message:
					"Deseja realmente excluir, todo histórico será excluido?",
				button: {
					no: "Não",
					yes: "Sim",
				},
				callback: (payload) => {
					if (payload) {
						this.ActionDeleteTask(id).then((result) => {
							this.$root.$emit("message::show", {
								timeout: 2000,
								text: "Tarefa excluida!",
							});
							this.$emit("task-excluida", id);
						});
					}
				},
			});
		},
	},
};
</script>