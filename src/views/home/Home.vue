<template>
	<v-container>
		<v-row align="center" justify="center">
			<Timer
				:task="activeTask"
				v-model="timer"
				@timer:start="start"
				@timer:pause="pause"
				@timer:stop="stop"
			/>
		</v-row>

		<v-row align="center" justify="center">
			<v-col cols="12">
				<RecentCard
					v-for="item in recentTasks"
					:task="item"
					:key="item.id"
					@ativar="ativar"
					:running="running"
				></RecentCard>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Time } from "../../model/time";
import Timer from "../../components/Timer";
import playIcon from "../../assets/play.png";
import stopIcon from "../../assets/stop.png";
import pauseIcom from "../../assets/pause.png";
import RecentCard from "../../components/RecentCard";

export default {
	name: "Home",

	components: { Timer, RecentCard },

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
			"ActionActiveSomaTimes",
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

				await this.ActionActiveSomaTimes(this.activeTask.id);

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

		podeSair() {
			if (
				this.running ||
				this.timer.hora !== "00" ||
				this.timer.minuto !== "00" ||
				this.timer.segundo !== "00"
			) {
				return false;
			} else {
				return true;
			}
		},

		async ativar(id) {
			await this.ActionUpdateActives(id);
			this.ActionFilterRecenteTasks();
		},
	},

	mounted() {
		this.ActionGetActive().catch((err) =>
			this.$root.$emit("message::show", {
				timeout: 2000,
				text: "Nenhuma tarefa ativa!",
			})
		);
		this.ActionFilterRecenteTasks();
	},

	beforeRouteLeave(to, from, next) {
		if (!this.podeSair()) {
			this.$confirm({
				title: "Confirme!",
				message:
					"É preciso parar para salvar o tempo, antes de sair da página.",
				button: {
					yes: "OK",
				},
				callback: () => {
					next(false);
				},
			});
		} else {
			next(true);
		}
	},
};
</script>
