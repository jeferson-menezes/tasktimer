<template>
	<v-card :color="task.bg" class="mt-2">
		<v-card-title>
			<v-row align="start" dense justify="space-between">
				<v-col cols="auto">
					<div class="text-truncate subtitle-1 font-weight-medium" :class="task.color">
						{{ task.codigo }} - {{ task.nome }}
					</div>
				</v-col>
				<v-col cols="auto">
					<v-btn icon :color="task.color" @click="excluir(task.id)">
						<v-icon >mdi-delete</v-icon>
					</v-btn>
				</v-col>
			</v-row>
			<v-row dense>
				<v-col cols="12">
					<div class="body-2 font-weight-black" :class="task.color">Tempo total {{ somaTempo }}</div>
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-actions>
			<v-btn
				color="orange lighten-2"
				class="subtitle-2"
				text
				@click="show = !show"
			>
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
		somaTempo: "",
	}),

	methods: {
		...mapActions("task", ["ActionDeleteTask"]),
		...mapActions("history", ["ActionSomaTimes"]),
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

	mounted() {
		this.ActionSomaTimes(this.task.id).then((result) => {
			this.somaTempo = result;
		});
	},
};
</script>