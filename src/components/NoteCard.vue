<template>
	<v-alert
		:key="note.id"
		:color="color"
		border="left"
		elevation="2"
		colored-border
	>
		<v-row justify="space-between" align="center">
			<v-col cols="auto">
				<div class="subtitle-1 font-weight-medium">
					{{ note.data | datetime }}
				</div>
			</v-col>
			<v-col cols="auto">
				<v-btn icon :color="color" @click="excluir(note.id)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<p class="text-justify body-2 ma-0">
			{{ note.texto }}
		</p>
	</v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "NoteCard",

	props: {
		note: Object,
		color: String,
	},

	methods: {
		...mapActions("history", ["ActionDeleteNote"]),

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
						this.ActionDeleteNote(id).then((result) => {
							this.$root.$emit("message::show", {
								timeout: 2000,
								text: "Nota excluida!",
							});
							this.$emit("note-excluida", id);
						});
					}
				},
			});
		},
	},
};
</script>