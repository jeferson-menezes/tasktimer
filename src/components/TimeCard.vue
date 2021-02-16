<template>
	<v-card class="mt-1 pa-0">
		<v-card-title class="pa-2">
			<span class="font-weight-medium text-uppercase body-1">
				tempo - {{ time.tempo }}
			</span>
			<v-spacer></v-spacer>
			<v-btn icon :color="color" @click="excluir(time.id)">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-card-title>

		<v-card-subtitle class="pa-2">
			<span class="font-weight-medium"> iniciado em - </span>
			<small class="font-weight-regular ">
				{{ time.inicio | datetime }}
			</small>
			<span class="font-weight-medium"> finalizado em - </span>
			<small class="font-weight-regular">{{ time.fim | datetime }}</small>
		</v-card-subtitle>
	</v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "TimeCard",

	props: {
		time: Object,
		color: String,
	},

	methods: {
		...mapActions("history", ["ActionDeleteTime"]),

		excluir(id) {
			this.$confirm({
				title: "Confirme!",
				message: "Deseja realmente excluir?",
				button: {
					no: "Não",
					yes: "Sim",
				},

				callback: (payload) => {
					if (payload) {
						this.ActionDeleteTime(id).then((result) => {
							this.$root.$emit("message::show", {
								timeout: 2000,
								text: "Tempo excluido!",
							});
							this.$emit('time-excluido', id)
						});
					}
				},
			});
		},
	},
};
</script>