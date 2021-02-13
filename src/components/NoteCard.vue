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
				<v-btn icon :color="color">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-col>
		</v-row>

		<p class="text-justify">
			{{ note.texto }}
		</p>
	</v-alert>
</template>

<script>
export default {
    name: "NoteCard",
	props: {
		note: Object,
		color: String,
	},
};
</script>