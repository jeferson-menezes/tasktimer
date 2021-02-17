<template>
	<v-card class="mt-3" :color="task.bg">
		<v-card-actions>
			<v-list-item class="pl-1">
				<v-list-item-avatar class="mr-2">
					<v-btn
						:disabled="running"
						fab
						dark
						small
						@click="ativar(task.id)"
					>
						<v-icon dark> mdi-play </v-icon>
					</v-btn>
				</v-list-item-avatar>
				<v-list-item-title :class="task.color">
					<div class="font-weight-light text-truncate">
						{{ task.codigo }} - {{ task.nome }}
					</div>
				</v-list-item-title>
				<v-row justify="end" align="center">
					<v-badge overlap right color="amber darken-4" class="mb-1">
						<v-icon>mdi-clock</v-icon>
						<span slot="badge">{{ totalTimes }}</span>
					</v-badge>

					<v-badge overlap right color="amber darken-4" class="mt-1">
						<v-icon>mdi-comment</v-icon>
						<span slot="badge">{{ totalNotes }}</span>
					</v-badge>
				</v-row>
			</v-list-item>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "RecentCard",

	props: { task: Object, running: Boolean },

	data: () => ({
		totalNotes: 0,
		totalTimes: 0,
	}),

	methods: {
		...mapActions("history", ["ActionTotalTimes", "ActionTotalNotes"]),

		ativar(id) {
			this.$emit("ativar", id);
		},
	},
	mounted() {
		this.ActionTotalTimes(this.task.id).then(
			(result) => (this.totalTimes = result)
		);
		this.ActionTotalNotes(this.task.id).then(
			(result) => (this.totalNotes = result)
		);
	},
};
</script>