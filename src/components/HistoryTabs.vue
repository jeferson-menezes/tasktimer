<template>
	<v-row>
		<v-tabs
			v-model="tab"
			fixed-tabs
			:background-color="color"
			color="grey lighten-2"
		>
			<v-tab href="#times" @click="listTimes">
				<v-btn small icon dark :loading="timeLoading">
					<v-icon>mdi-clock</v-icon>
				</v-btn>
			</v-tab>
			<v-tab href="#notes" @click="listNotes">
				<v-btn small icon dark :loading="noteLoading">
					<v-icon>mdi-comment</v-icon>
				</v-btn>
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item value="times">
				<TimeCard
					v-for="time in times"
					:key="time.id"
					:time="time"
					:color="color"
					@time-excluido="timeExcluido"
				></TimeCard>
			</v-tab-item>

			<v-tab-item value="notes">
				<NoteCard
					v-for="note in notes"
					:key="note.id"
					:note="note"
					:color="color"
					@note-excluida="noteExcluido"
				></NoteCard>
			</v-tab-item>
		</v-tabs-items>
	</v-row>
</template>

<script>
import { mapActions } from "vuex";
import NoteCard from "./NoteCard";
import TimeCard from "./TimeCard";

export default {
	name: "HistoryTabs",

	components: {
		NoteCard,
		TimeCard,
	},

	props: {
		color: String,
		id: Number,
	},

	data: () => ({
		tab: null,
		timeLoading: false,
		noteLoading: false,
		times: [],
		notes: [],
	}),

	methods: {
		...mapActions("history", ["ActionListTimes", "ActionListNotes"]),

		listNotes() {
			this.noteLoading = true;
			this.ActionListNotes(this.id)
				.then((res) => (this.notes = res))
				.finally(() => (this.noteLoading = false));
		},

		listTimes() {
			this.timeLoading = true;
			this.ActionListTimes(this.id)
				.then((res) => (this.times = res))
				.finally(() => (this.timeLoading = false));
		},

		timeExcluido(id) {
			this.times = this.times.filter((t) => t.id !== id);
		},

		noteExcluido(id) {
			this.notes = this.notes.filter((n) => n.id !== id);
		},
	},

	created() {},
};
</script> 