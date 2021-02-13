
<template>
	<v-card :color="color" class="mt-2">
		<v-card-title> {{ title }}</v-card-title>
		<v-card-actions>
			<v-btn color="orange lighten-2" text  @click="show = !show"> Histórico </v-btn>
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
export default {
	name: "",

	props: {
		title: String,
		color: String,
		codigo: String,
	},

	data: () => ({
		show: false,
	}),
};
</script>