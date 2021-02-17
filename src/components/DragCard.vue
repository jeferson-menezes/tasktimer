<template>
	<v-card tile width="100%" class="mt-1 mb-1 pa-0" :color="task.bg">
		<v-card-text class="font-weight-medium" :class="task.color">
			{{ task.codigo }} - {{ task.nome }}
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "DragCard",
	props: { task: {} },
};
</script>