<template>
	<v-snackbar
		v-model="snackbar"
		:timeout="timeout"
		:value="true"
		top
		color="teal accent-3"
		elevation="24"
	>
		{{ text }}
	</v-snackbar>
</template>

<script>
export default {
	name: "MessageSnack",

	data: () => ({
		snackbar: false,
		text: "",
		timeout: 1000,
	}),

	created() {
		this.$root.$on("message::show", (payload) => {
			this.snackbar = true;
			this.timeout = payload.timeout;
			this.text = payload.text;
		});
	},
};
</script>
