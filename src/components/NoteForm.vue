<template>
	<v-bottom-sheet v-model="sheet" inset>
		<v-card>
			<v-form ref="form" v-model="valid" @submit.prevent="submit">
				<v-card-text>
					<v-textarea
						v-model="form.nome"
						:rules="rules.nome"
						label="Adicionar nota"
						required
					></v-textarea>
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
import { required } from "../shared/rules";
import { Note } from "../model/note";
import { mapActions } from 'vuex';
export default {
	name: "NoteForm",

	data: () => ({
		valid: false,
		sheet: null,
		form: {
			nome: "",
		},
		rules: {
			nome: [required("Descreva alguma coisa, horas!")],
		},
		task: {},
	}),

	methods: {

        ...mapActions('history', ['ActionSaveNote']),

		async submit() {
			if (!this.validForm()) return;

			try {
				const { nome } = this.form;

				const note = new Note(
					nome,
					new Date().toISOString(),
					this.task.id
				);

                await this.ActionSaveNote(note)

                this.$refs.form.reset();

                this.$root.$emit("message::show", {
					timeout: 2000,
					text: "Nota adicionada",
				});

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
		this.$root.$on("note-form-open", (payload) => {
            this.task = payload
			this.sheet = true;
		});
	},
};
</script>