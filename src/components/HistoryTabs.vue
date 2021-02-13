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
				<v-list two-line>
					<template v-for="item in times">
						<v-list-item :key="item.id">
							<v-list-item-content>
								<v-list-item-title>
									<span
										class="font-weight-medium text-uppercase"
									>
										tempo - </span
									>{{ item.tempo }}</v-list-item-title
								>
								<v-list-item-subtitle>
									<span class="font-weight-medium">
										iniciado em -
									</span>
									<small class="font-weight-regular">
										{{ item.inicio | datetime }} </small
									><br />
									<span class="font-weight-medium">
										finalizado em -
									</span>
									<small class="font-weight-regular">{{
										item.fim | datetime
									}}</small>
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action>
								<v-btn icon>
									<v-icon color="grey lighten-1"
										>mdi-delete</v-icon
									>
								</v-btn>
							</v-list-item-action>
						</v-list-item>
					</template>
				</v-list>
			</v-tab-item>

			<v-tab-item value="notes">

				<NoteCard 
					v-for="note in notes"
					:key="note.id"
					:note="note"
					:color="color"
				></NoteCard>
			</v-tab-item>
		</v-tabs-items>
	</v-row>
</template>

<script>
import { mapActions } from "vuex";
import NoteCard from "./NoteCard";

export default {
	name: "HistoryTabs",

	components: {
		NoteCard,
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
	},

	created() {},
};
</script> 