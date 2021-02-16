<template>
	<v-card class="mb-3" v-if="show">
		<v-card elevation="0">
			<v-container>
				<v-sheet class="pa-4">
					<v-row justify="center" align="center">
						<v-col cols="auto" class="text-center">
							<span
								class="display-2 text-center font-weight-light"
							>
								{{ value.hora }}
							</span>
							<br />
							<small class="font-weight-thin text-center">
								hora
							</small>
						</v-col>

						<v-col cols="auto" class="text-center">
							<span
								class="display-2 text-center font-weight-light"
							>
								{{ value.minuto }}
							</span>
							<br />
							<small class="font-weight-thin text-center">
								minuto
							</small>
						</v-col>

						<v-col cols="auto" class="text-center">
							<span
								class="display-2 text-center font-weight-light"
								>{{ value.segundo }}</span
							>
							<br />
							<small class="font-weight-thin text-center"
								>segundo</small
							></v-col
						>
					</v-row>
				</v-sheet>
			</v-container>
			<v-card-subtitle>
				<v-row
					justify="center"
					align="center"
					class="font-weight-light"
				>
					<v-col cols="auto">
						{{ (task || {}).codigo || null }} -
						{{ (task || {}).nome || null }}
					</v-col>
				</v-row>
			</v-card-subtitle>
		</v-card>

		<v-card elevation="0">
			<v-sheet class="pa-8">
				<v-row justify="space-around">
					<v-btn
						:disabled="!running"
						color="deep-purple darken-1"
						fab
						small
						outlined
						@click="pause"
					>
						<v-icon medium>mdi-pause</v-icon>
					</v-btn>
					<v-btn
						v-show="!running"
						rounded
						@click="start"
						color="deep-purple darken-1"
						class="white--text"
					>
						<v-icon left medium> mdi-play </v-icon>
						iniciar
					</v-btn>
					<v-btn
						v-show="running"
						rounded
						color="red darken-1"
						@click="stop"
						class="white--text"
					>
						<v-icon left medium> mdi-stop </v-icon>
						parar
					</v-btn>
					<v-btn
						color="deep-purple darken-1"
						fab
						small
						dark
						outlined
						@click="addNote"
					>
						<v-icon medium>mdi-plus</v-icon>
					</v-btn>
				</v-row>
			</v-sheet>
		</v-card>
	</v-card>
</template>

<script>
import moment from "moment";

export default {
	name: "Timer",

	model: {
		prop: "value",
	},

	props: {
		value: Object,
		task: Object,
	},

	data: () => ({
		inicio: null,
		tempo: null,
		segundos: null,
		idTimer: null,
		running: false,
	}),

	methods: {
		start() {
			if (!this.inicio) {
				this.inicio = new Date().toISOString();
			}
			this.tempo = moment.duration(
				`${this.value.hora}:${this.value.minuto}:${this.value.segundo}`
			);
			this.segundos = this.tempo.asSeconds();
			clearInterval(this.idTimer);
			this.running = true;
			this.$emit("timer:start");
			this.idTimer = setInterval(() => {
				this.segundos++;
				this.atualizaView();
			}, 1000);
		},

		stop() {
			this.running = false;
			clearInterval(this.idTimer);
			const tempo = this.segundoToTempo();
			this.$emit("timer:stop", { tempo, inicio: this.inicio });

			this.zerar();
		},

		pause() {
			this.running = false;
			clearInterval(this.idTimer);
			this.$emit("timer:pause");
		},

		atualizaView() {
			let tempo = this.segundoToTempo();
			tempo = tempo.split(":");
			this.value.hora = tempo[0];
			this.value.minuto = tempo[1];
			this.value.segundo = tempo[2];
		},
		segundoToTempo() {
			return moment()
				.startOf("day")
				.seconds(this.segundos)
				.format("HH:mm:ss");
		},

		zerar() {
			this.inicio = null;
			this.tempo = null;
			this.segundos = null;
			this.idTimer = null;
			this.running = false;
			this.value.hora = "00";
			this.value.minuto = "00";
			this.value.segundo = "00";
		},

		addNote() {
			this.$root.$emit("note-form-open", this.task);
		},
	},

	computed: {
		show() {
			if (this.task && this.task.hasOwnProperty("_nome")) {
				return true;
			} else {
				return false;
			}
		},
	},
};
</script>
