<template>
	<v-container>
		<v-row dense justify="center">
			<v-col align-self="end" cols="12"  v-if="paleta.length">
				<v-btn fab small @click="voltar()">
					<v-icon>mdi-arrow-left </v-icon>
				</v-btn>
			</v-col>
			<v-col cols="auto" v-for="(item, index) in cores" :key="index">
				<v-btn
					:color="item.name"
					small
					@click="filtrar(item.name)"
				></v-btn>
			</v-col>

			<v-col cols="auto" v-for="item in paleta" :key="item.hexa">
				<v-btn
					:color="item.name"
					small
					@click="seleciona(item.name)"
				></v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
	
	name: "SelectColor",

	props: ['value'],

	data: () => ({ cores: [], paleta: [] }),

	methods: {

		...mapActions("task", ["ActionListColors", "ActionListPalette"]),

		filtrar(name) {
			this.ActionListPalette(name).then((res) => {
				this.cores = [];
				this.paleta = res;
			});
		},

		seleciona(name) {
			this.$emit('input', name)
		},

		voltar() {
			this.ActionListColors().then((res) => {
				this.paleta = [];
				this.cores = res;
			});
		},
	},

	mounted() {
		this.ActionListColors().then((res) => (this.cores = res));
	},
};
</script>












