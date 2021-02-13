<template>
	<v-container grid-list-xs>
		<Timer
			:task="activeTask"
			v-model="timer"
			@timer:start="start"
			@timer:pause="pause"
			@timer:stop="stop"
		/>

		<v-card
			v-for="(item, i) in recentTasks"
			:key="i"
			class="mt-3"
			:color="item.cor"
		>
			<v-card-actions>
				<v-list-item class="pl-1">
					<v-list-item-avatar class="mr-2">
						<v-btn
							:disabled="running"
							fab
							dark
							small
							@click="ativar(item.id)"
						>
							<v-icon dark> mdi-play </v-icon>
						</v-btn>
					</v-list-item-avatar>
					<v-list-item-title class="font-weight-light">
						{{ item.nome }}
					</v-list-item-title>
					<v-row justify="end" align="center">
						<v-badge
							overlap
							right
							color="amber darken-4"
							class="mb-1"
						>
							<v-icon>mdi-clock</v-icon>
							<span slot="badge">9</span>
						</v-badge>

						<v-badge
							overlap
							right
							color="amber darken-4"
							class="mt-1"
						>
							<v-icon>mdi-comment</v-icon>
							<span slot="badge">9</span>
						</v-badge>
					</v-row>
				</v-list-item>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Time } from "../../model/time";
import Timer from "../../components/Timer";
import playIcon from "../../assets/play.png";
import stopIcon from "../../assets/stop.png";
import pauseIcom from "../../assets/pause.png";

export default {
	name: "Home",

	components: { Timer },

	data: () => ({
		timer: {
			hora: "00",
			minuto: "00",
			segundo: "00",
		},
		running: false,
	}),

	computed: {
		...mapState("home", ["activeTask", "recentTasks"]),
	},

	methods: {
		...mapActions("home", [
			"ActionFilterRecenteTasks",
			"ActionGetActive",
			"ActionUpdateActives",
			
		]),

		...mapActions("history", ["ActionSaveTime"]),
		
		start() {
			this.running = true;
			new Notification("Tasktimer", {
				body: `O ${this.activeTask.nome} iniciado!`,
				icon: playIcon,
			});
		},

		async stop(payload) {
			try {
				this.running = false;

				new Notification("Tasktimer", {
					body: `O ${this.activeTask.nome} parado!`,
					icon: stopIcon,
				});

				const time = new Time(
					payload.tempo,
					payload.inicio,
					new Date().toISOString(),
					this.activeTask.id
				);

				await this.ActionSaveTime(time);

				this.$root.$emit("message::show", {
					timeout: 2000,
					text: `Salvo tempo a ${this.activeTask.nome}`,
				});
			} catch (error) {}
		},

		pause() {
			new Notification("Tasktimer", {
				body: `O ${this.activeTask.nome} pausado!`,
				icon: pauseIcom,
			});
		},

		async ativar(id) {
			await this.ActionUpdateActives(id);
			this.ActionFilterRecenteTasks();
		},
	},

	created() {
		this.ActionGetActive().catch((err) =>
			this.$root.$emit("message::show", {
				timeout: 2000,
				text: "Nenhuma tarefa ativa!",
			})
		);
		this.ActionFilterRecenteTasks();
	},

	beforeRouteEnter(to, from, next) {
		// alert("Voltando para a rota");
		next();
	},

	beforeRouteLeave(to, from, next) {
		// const sair = window.confirm("Deseja sair da rota")
		next(true);
	},
};
</script>
