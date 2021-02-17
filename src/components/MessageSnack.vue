<template>
	<v-snackbar
		v-model="snackbar"
		:timeout="timeout"
		:value="true"
		top
		color="success"
		elevation="24"
	>
		{{ text }}
	</v-snackbar>
</template>

<script>
export default {
	name: "MessageSnack",
// info
// error
// warning
// success
	data: () => ({
		snackbar: false,
		text: "",
		timeout: 5000,
		color: 'info'
	}),

	created() {
		this.$root.$on("message::show", (payload) => {
			this.snackbar = true;
			this.timeout = payload.timeout;
			this.text = payload.text;
			this.color = payload.color || 'info'
		});
	},
};
</script>
