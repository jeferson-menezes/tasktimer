<template>
	<v-bottom-sheet v-model="sheet" inset>
		<v-card>
			<v-form ref="form" v-model="valid" @submit.prevent="submit">
				<v-card-text>
					<v-text-field
						v-model="form.codigo"
						:rules="rules.codigo"
						label="Código"
						required
					></v-text-field>

					<v-text-field
						v-model="form.nome"
						:rules="rules.nome"
						label="Nome"
						required
					></v-text-field>

					<v-text-field
						disabled
						v-model="form.cor.bg"
						:rules="rules.bg"
						label="Cor"
						required
						placeholder="79938"
					></v-text-field>

					<SelectColor v-model="form.cor" />
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" type="submit"> Salvar </v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-bottom-sheet>
</template>

<script>
import { Task, Status } from "../model/task";
import { mapActions } from "vuex";
import { required } from "../shared/rules";
import SelectColor from "./SelectColor";

export default {
	name: "TaskForm",

	components: { SelectColor },

	data: () => ({
		valid: false,
		sheet: null,
		form: {
			nome: "",
			codigo: "",
			cor: {
				bg: "",
				color: "",
			},
		},
		rules: {
			nome: [required("Como assim não deu um nome!")],
			codigo: [required("Como vai diferenciar sem código?!")],
			bg: [required("Põe uma corzinha ai né!")],
		},
	}),

	methods: {
		...mapActions("task", ["ActionSaveTask"]),
		...mapActions("home", ["ActionFilterRecenteTasks"]),

		async submit() {
			if (!this.validForm()) return;

			try {
				const {
					nome,
					codigo,
					cor: { bg, color },
				} = this.form;

				const task = new Task(
					nome,
					codigo,
					Status.RECENTE,
					bg,
					new Date().toISOString(),
					color
				);

				await this.ActionSaveTask(task);

				this.$refs.form.reset();

				this.$root.$emit("message::show", {
					timeout: 2000,
					text: "Tarefa adicionada",
				});

				this.ActionFilterRecenteTasks();
			} catch (error) {
				console.error(error);
			}
		},

		validForm() {
			if (this.valid) {
				return true;
			} else {
				this.$refs.form.validate();
				setTimeout(this.$refs.form.resetValidation, 3000);
				return false;
			}
		},
	},

	mounted() {
		this.$root.$on("task-form-open", (payload) => {
			this.sheet = true;
		});
	},
};
</script>
